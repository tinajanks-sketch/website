'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { buildScenario, variance, varianceBreakdown, toCSV } = require('../forecast.js');

test('default actuals and forecasts reconcile to independently calculated reference figures', () => {
  const model = buildScenario();
  assert.equal(model.yearToDate.actual.revenue, 648000);
  assert.equal(model.yearToDate.actual.operatingResult, 115770);
  assert.equal(model.yearToDate.budget.revenue, 630812);
  assert.equal(model.yearToDate.budget.operatingResult, 126488);
  assert.equal(model.outlook.budget.revenue, 1510419);
  assert.equal(model.outlook.budget.operatingResult, 402250);
  assert.equal(model.outlook.forecast.revenue, 1641646);
  assert.equal(model.outlook.forecast.operatingResult, 436153);
  assert.deepEqual(model.forecast[0].value, {
    revenue: 122400, variableCosts: 51408, fixedCosts: 43000, operatingResult: 27992
  });
  assert.equal(model.forecast[11].value.revenue, 152190);
});

test('scenario changes preserve historical actuals and the original budget', () => {
  const original = buildScenario();
  const revised = buildScenario({ growth: -5, variableCost: 65, fixedCostChange: 30 });
  assert.deepEqual(revised.history, original.history);
  assert.deepEqual(revised.rows.map(row => row.budget), original.rows.map(row => row.budget));
  assert.deepEqual(revised.yearToDate, original.yearToDate);
  assert.notDeepEqual(revised.outlook.forecast, original.outlook.forecast);
});

test('moving the cutoff rolls a full twelve-month horizon across calendar years', () => {
  const model = buildScenario({ closedMonth: 9 });
  assert.deepEqual(model.rows.slice(0, 3).map(row => row.period), ['2026-07', '2026-08', '2026-09']);
  assert.equal(model.forecast.length, 12);
  assert.equal(model.forecast[0].period, '2026-10');
  assert.equal(model.forecast[11].period, '2027-09');
  assert.equal(model.forecast[0].value.revenue, 131580);
  assert.equal(model.rows.length, 15);
});

test('an earlier cutoff uses only actuals available at that reporting date', () => {
  const model = buildScenario({ closedMonth: 3, growth: 0 });
  assert.equal(model.history.length, 3);
  assert.equal(model.forecast[0].period, '2026-04');
  assert.equal(model.forecast[11].period, '2027-03');
  assert.ok(model.forecast.every(row => row.value.revenue === 108000));
});

test('cost and growth controls can represent losses without clamping them away', () => {
  const model = buildScenario({ growth: 0, variableCost: 65, fixedCostChange: 30 });
  assert.equal(model.forecast[0].value.variableCosts, 78000);
  assert.equal(model.forecast[0].value.fixedCosts, 55900);
  assert.equal(model.forecast[0].value.operatingResult, -13900);
  assert.equal(model.outlook.forecast.operatingResult, -166800);
});

test('revenue above budget can coexist with an unfavourable operating variance', () => {
  const { yearToDate } = buildScenario();
  assert.equal(variance(yearToDate.actual.revenue, yearToDate.budget.revenue).amount, 17188);
  assert.equal(variance(yearToDate.actual.operatingResult, yearToDate.budget.operatingResult).amount, -10718);
  assert.equal(variance(16860, 21673).amount, -4813);
});

test('monthly values and totals reconcile in every permitted cutoff and boundary scenario', () => {
  for (const closedMonth of [3, 6, 9]) {
    for (const options of [{ growth: -5, variableCost: 65, fixedCostChange: 30 }, { growth: 8, variableCost: 25, fixedCostChange: -20 }]) {
      const model = buildScenario({ closedMonth, ...options });
      model.rows.forEach(row => {
        for (const values of [row.budget, row.value]) {
          assert.ok(Object.values(values).every(Number.isSafeInteger));
          assert.equal(values.operatingResult, values.revenue - values.variableCosts - values.fixedCosts);
        }
      });
      assert.equal(model.outlook.forecast.operatingResult, model.forecast.reduce((sum, row) => sum + row.value.operatingResult, 0));
    }
  }
});

test('invalid assumptions are rejected instead of producing misleading figures', () => {
  for (const options of [{ closedMonth: 7 }, { growth: NaN }, { growth: Infinity }, { growth: 9 }, { variableCost: 0 }, { fixedCostChange: -21 }]) {
    assert.throws(() => buildScenario(options), RangeError);
  }
});

test('zero budgets have no percentage variance and negative baselines remain interpretable', () => {
  assert.deepEqual(variance(100, 0), { amount: 100, percent: null });
  assert.deepEqual(variance(-50, -100), { amount: 50, percent: 50 });
});

test('CSV exports the displayed monthly data, both metrics and forecast assumptions', () => {
  const csv = toCSV(buildScenario({ closedMonth: 9, growth: 3, variableCost: 45 }));
  const rows = csv.trim().split('\r\n');
  assert.equal(rows.length, 16);
  assert.match(rows[0], /Hypothetical example/);
  assert.match(rows[0], /Budget operating result/);
  assert.match(rows[1], /"2026-07","Actual","EUR"/);
  assert.match(rows[4], /"2026-10","Forecast","EUR"/);
  assert.match(rows[4], /"3","45","0"$/);
  assert.match(rows[15], /"2027-09"/);
  assert.match(toCSV(buildScenario(), 'de'), /Fiktives Beispiel/);
});


test('zero overhead adjustment carries forward the latest actual month at every cutoff', () => {
  for (const closedMonth of [3,6,9]) {
    const model = buildScenario({closedMonth});
    const actualFixed = model.history.at(-1).value.fixedCosts;
    assert.equal(model.fixedCostBase, actualFixed);
    assert.ok(model.forecast.every(row=>row.value.fixedCosts===actualFixed));
    assert.equal(buildScenario({closedMonth,fixedCostChange:10}).forecast[0].value.fixedCosts,Math.round(actualFixed*1.1));
  }
});

test('monthly growth is annualised transparently', () => {
  assert.ok(Math.abs(buildScenario().annualisedGrowth-26.8241794563)<0.000001);
  assert.equal(buildScenario({growth:0}).annualisedGrowth,0);
  assert.ok(buildScenario({growth:-5}).annualisedGrowth<0);
});

test('variance breakdown reconciles actual and forecast results with correct cost signs', () => {
  const model=buildScenario();
  assert.deepEqual(varianceBreakdown(model,'yearToDate'),{
    budgetResult:126488,revenueEffect:17188,variableCostEffect:-24906,fixedCostEffect:-3000,result:115770
  });
  assert.deepEqual(varianceBreakdown(model,'outlook'),{
    budgetResult:402250,revenueEffect:131227,variableCostEffect:-85324,fixedCostEffect:-12000,result:436153
  });
  for(const closedMonth of [3,6,9]){
    for(const reportingPeriod of ['yearToDate','outlook']){
      const values=varianceBreakdown(buildScenario({closedMonth,growth:-5,variableCost:65,fixedCostChange:30}),reportingPeriod);
      assert.equal(values.budgetResult+values.revenueEffect+values.variableCostEffect+values.fixedCostEffect,values.result);
    }
  }
  assert.throws(()=>varianceBreakdown(model,'unknown'),RangeError);
});

test('CSV preserves the actual fixed-cost baseline alongside scenario assumptions', () => {
  const csv=toCSV(buildScenario());
  assert.match(csv,/Latest actual monthly fixed overheads/);
  assert.match(csv,/"43000","2","42","0"/);
});
