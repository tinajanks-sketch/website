'use strict';
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ConsultixForecast = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const DEFAULTS = Object.freeze({ closedMonth: 6, growth: 2, variableCost: 42, fixedCostChange: 0 });
  const ACTUALS = [
    [96000, 42240, 42000], [103000, 44290, 42000], [108000, 45360, 42500],
    [106000, 46640, 42500], [115000, 48300, 43000], [120000, 50400, 43000],
    [117000, 50310, 43500], [125000, 51250, 43500], [129000, 54180, 44000]
  ];
  const period = index => new Date(Date.UTC(2026, index, 1)).toISOString().slice(0, 7);
  const figures = (revenue, variableCosts, fixedCosts) => ({
    revenue, variableCosts, fixedCosts, operatingResult: revenue - variableCosts - fixedCosts
  });
  function budget(index) {
    const revenue = Math.round(100000 * Math.pow(1.02, index));
    return figures(revenue, Math.round(revenue * 0.4), 42000);
  }
  function total(rows, key) {
    return rows.reduce((sum, row) => {
      Object.keys(sum).forEach(metric => { sum[metric] += row[key][metric]; });
      return sum;
    }, figures(0, 0, 0));
  }
  function buildScenario(options = {}) {
    const assumptions = { ...DEFAULTS, ...options };
    if (![3, 6, 9].includes(assumptions.closedMonth)) throw new RangeError('Choose a sample cutoff of March, June or September.');
    for (const [key, minimum, maximum] of [['growth', -5, 8], ['variableCost', 25, 65], ['fixedCostChange', -20, 30]]) {
      if (!Number.isFinite(assumptions[key]) || assumptions[key] < minimum || assumptions[key] > maximum) {
        throw new RangeError('Invalid forecast assumption: ' + key);
      }
    }
    const history = ACTUALS.slice(0, assumptions.closedMonth).map((values, index) => ({
      index, period: period(index), kind: 'actual', budget: budget(index), value: figures(...values)
    }));
    let revenue = history[history.length - 1].value.revenue;
    const fixedCostBase = history[history.length - 1].value.fixedCosts;
    const fixedCosts = Math.round(fixedCostBase * (1 + assumptions.fixedCostChange / 100));
    const forecast = Array.from({ length: 12 }, (_, offset) => {
      const index = assumptions.closedMonth + offset;
      revenue = Math.round(revenue * (1 + assumptions.growth / 100));
      return {
        index, period: period(index), kind: 'forecast', budget: budget(index),
        value: figures(revenue, Math.round(revenue * assumptions.variableCost / 100), fixedCosts)
      };
    });
    return {
      assumptions, fixedCostBase, annualisedGrowth: (Math.pow(1 + assumptions.growth / 100, 12) - 1) * 100,
      rows: [...history.slice(-3), ...forecast], history, forecast,
      yearToDate: { budget: total(history, 'budget'), actual: total(history, 'value') },
      outlook: { budget: total(forecast, 'budget'), forecast: total(forecast, 'value') }
    };
  }
  function variance(value, planned) {
    return { amount: value - planned, percent: planned === 0 ? null : (value - planned) / Math.abs(planned) * 100 };
  }

  function varianceBreakdown(model, reportingPeriod = 'outlook') {
    if (!['outlook','yearToDate'].includes(reportingPeriod)) throw new RangeError('Unknown reporting period.');
    const group = reportingPeriod === 'outlook' ? model.outlook : model.yearToDate;
    const value = reportingPeriod === 'outlook' ? group.forecast : group.actual;
    return {
      budgetResult: group.budget.operatingResult,
      revenueEffect: value.revenue - group.budget.revenue,
      variableCostEffect: group.budget.variableCosts - value.variableCosts,
      fixedCostEffect: group.budget.fixedCosts - value.fixedCosts,
      result: value.operatingResult
    };
  }
  const copy = {
    en: {
      exampleLabel: 'ILLUSTRATIVE EXAMPLE · HYPOTHETICAL DATA',
      title: 'Illustrative rolling P&L forecast',
      annualisedLabel: 'Annualised revenue growth', fixedBaseLabel: 'Latest actual overheads', perMonth: 'per month',
      bridgeTitle: 'What explains the operating-result gap?', bridgeActual: 'Year to date', bridgeForecast: 'Next 12 months',
      bridgeBudget: 'Budget result', bridgeRevenue: 'Revenue effect', bridgeVariable: 'Variable-cost effect', bridgeFixed: 'Fixed-overhead effect',
      bridgeForecastResult: 'Forecast result', bridgeActualResult: 'Actual result', bridgeUpdated: 'Variance breakdown updated: ',
      bridgeExplanation: 'Add the revenue and cost effects to the budget result to arrive at the actual or forecast result. Higher costs have a negative effect, even when revenue is above budget.',
      intro: 'Choose a reporting cutoff and adjust the assumptions. Historical actuals and the original budget stay fixed; the forecast covers the next 12 months.',
      currency: 'All figures in EUR', cutoffLabel: 'Latest closed month',
      march: 'March 2026', june: 'June 2026', september: 'September 2026',
      growthLabel: 'Monthly revenue growth', variableCostLabel: 'Variable costs / revenue', fixedCostLabel: 'Fixed overhead adjustment',
      actualRevenue: 'Actual revenue · year to date', actualResult: 'Actual operating result · year to date',
      forecastRevenue: 'Forecast revenue · next 12 months', forecastResult: 'Forecast operating result · next 12 months',
      revenue: 'Revenue', operatingResult: 'Operating result', budget: 'Budget', actual: 'Actual', forecast: 'Forecast',
      chartUnit: 'EUR thousands', metricGroup: 'Chart and table metric', tableRegion: 'Monthly budget comparisons',
      periodNote: 'The chart and monthly table show the last three closed months and the next 12 forecast months. Actual summaries above cover the year to date.',
      reset: 'Reset example', download: 'Download monthly data (CSV)', tableSummary: 'View monthly budget comparisons',
      tableCaption: 'Hypothetical monthly figures in EUR. Variance is actual or forecast minus budget.',
      month: 'Month', status: 'Status', actualForecast: 'Actual / forecast', variance: 'Variance · EUR', variancePercent: 'Variance · %',
      varianceNote: 'For the revenue and operating result shown here, positive variances are above budget and favourable; negative variances are below budget.',
      methodSummary: 'How this example is calculated',
      methodRevenue: 'Forecast revenue starts from the latest actual month and compounds at the selected monthly growth rate. Variable costs are the selected share of forecast revenue.',
      methodCosts: 'Forecast fixed overheads carry forward the latest actual month, adjusted by the selected percentage. Operating result equals revenue minus variable costs and fixed overheads.',
      methodLimits: 'The original budget assumes monthly revenue growth of 2%, variable costs of 40% and fixed overheads of EUR 42,000. Actual figures are a separate, fixed sample dataset. All calculations round to whole euros each month. Fixed overheads are held constant after adjustment; seasonality, hiring and capacity constraints are not modelled. This simplified model excludes taxes, financing and the timing of cash collections or payments; operating result is not cash flow.',
      disclaimer: 'All figures are hypothetical and illustrate the method. They are not client results or a forecast for your business.',
      chartDescription: 'Budget, actual and forecast by month. The same figures are available in the monthly comparison table.',
      updated: 'Example updated. Forecast period: ', hypothetical: 'Hypothetical example',
      csvPeriod: 'Month (YYYY-MM)', csvCurrency: 'Currency', csvRevenueBudget: 'Budget revenue', csvRevenueValue: 'Actual or forecast revenue',
      csvRevenueVariance: 'Revenue variance', csvResultBudget: 'Budget operating result', csvResultValue: 'Actual or forecast operating result',
      csvResultVariance: 'Operating result variance', csvGrowth: 'Forecast monthly growth (%)',
      csvFixedBase: 'Latest actual monthly fixed overheads', csvVariableCost: 'Forecast variable costs (%)', csvFixedCost: 'Forecast fixed overhead adjustment (%)',
      actualInsight: 'In this example, year-to-date revenue is above budget while the operating result is below it. Cost drivers deserve attention alongside sales growth.',
      resultAbove: 'The next 12-month operating result is above budget in this scenario. The difference depends on the growth and cost assumptions shown.',
      resultBelow: 'The next 12-month operating result is below budget in this scenario. Review revenue assumptions and the effect of variable and fixed costs.',
      resultEqual: 'The next 12-month operating result matches budget in this scenario. The assumptions still need regular review.'
    },
    de: {
      exampleLabel: 'ANSCHAULICHES BEISPIEL · FIKTIVE DATEN',
      title: 'Beispiel einer rollierenden Ergebnisplanung',
      annualisedLabel: 'Auf ein Jahr hochgerechnetes Umsatzwachstum', fixedBaseLabel: 'Letzte tatsächliche Fixkosten', perMonth: 'pro Monat',
      bridgeTitle: 'Wie entsteht die Ergebnisabweichung?', bridgeActual: 'Seit Jahresbeginn', bridgeForecast: 'Nächste zwölf Monate',
      bridgeBudget: 'Budgetergebnis', bridgeRevenue: 'Umsatzeffekt', bridgeVariable: 'Effekt variabler Kosten', bridgeFixed: 'Fixkosteneffekt',
      bridgeForecastResult: 'Prognoseergebnis', bridgeActualResult: 'Ist-Ergebnis', bridgeUpdated: 'Abweichungsanalyse aktualisiert: ',
      bridgeExplanation: 'Addieren Sie die Umsatz- und Kosteneffekte zum Budgetergebnis, um das Ist- oder Prognoseergebnis zu erhalten. Höhere Kosten wirken negativ, auch wenn der Umsatz über Budget liegt.',
      intro: 'Wählen Sie einen Berichtsstand und passen Sie die Annahmen an. Historische Ist-Werte und das ursprüngliche Budget bleiben unverändert. Die Prognose umfasst jeweils die nächsten zwölf Monate.',
      currency: 'Alle Beträge in EUR', cutoffLabel: 'Letzter abgeschlossener Monat',
      march: 'März 2026', june: 'Juni 2026', september: 'September 2026',
      growthLabel: 'Monatliches Umsatzwachstum', variableCostLabel: 'Variable Kosten / Umsatz', fixedCostLabel: 'Anpassung der Fixkosten',
      actualRevenue: 'Ist-Umsatz · seit Jahresbeginn', actualResult: 'Ist-Betriebsergebnis · seit Jahresbeginn',
      forecastRevenue: 'Umsatzprognose · nächste zwölf Monate', forecastResult: 'Ergebnisprognose · nächste zwölf Monate',
      revenue: 'Umsatz', operatingResult: 'Betriebsergebnis', budget: 'Budget', actual: 'Ist', forecast: 'Prognose',
      chartUnit: 'Tausend EUR', metricGroup: 'Kennzahl für Diagramm und Tabelle', tableRegion: 'Monatlicher Budgetvergleich',
      periodNote: 'Diagramm und Monatstabelle zeigen die letzten drei abgeschlossenen Monate und zwölf Prognosemonate. Die Ist-Kennzahlen oben beziehen sich auf den Zeitraum seit Jahresbeginn.',
      reset: 'Beispiel zurücksetzen', download: 'Monatsdaten herunterladen (CSV)', tableSummary: 'Monatlichen Budgetvergleich anzeigen',
      tableCaption: 'Fiktive Monatswerte in EUR. Die Abweichung entspricht dem Ist- oder Prognosewert abzüglich des Budgets.',
      month: 'Monat', status: 'Status', actualForecast: 'Ist / Prognose', variance: 'Abweichung · EUR', variancePercent: 'Abweichung · %',
      varianceNote: 'Bei den hier gezeigten Umsatz- und Ergebniswerten sind positive Abweichungen gegenüber dem Budget günstig; negative Abweichungen liegen unter Budget.',
      methodSummary: 'So wird dieses Beispiel berechnet',
      methodRevenue: 'Der prognostizierte Umsatz geht vom letzten Ist-Monat aus und wächst monatlich mit der gewählten Rate. Die variablen Kosten entsprechen dem gewählten Anteil am prognostizierten Umsatz.',
      methodCosts: 'Die prognostizierten Fixkosten übernehmen den letzten Ist-Monat und werden um den gewählten Prozentsatz angepasst. Das Betriebsergebnis entspricht dem Umsatz abzüglich variabler Kosten und Fixkosten.',
      methodLimits: 'Das ursprüngliche Budget unterstellt 2 % monatliches Umsatzwachstum, 40 % variable Kosten und monatliche Fixkosten von 42.000 EUR. Die Ist-Werte bilden einen separaten, unveränderlichen Beispieldatensatz. Monatliche Berechnungen werden auf volle Euro gerundet. Nach der Anpassung bleiben die Fixkosten konstant. Saisonalität, Neueinstellungen und Kapazitätsgrenzen werden nicht modelliert. Das vereinfachte Modell berücksichtigt keine Steuern, Finanzierung oder Zahlungszeitpunkte. Das Betriebsergebnis ist kein Cashflow.',
      disclaimer: 'Alle Zahlen sind fiktiv und dienen der Veranschaulichung. Sie zeigen weder Kundenergebnisse noch eine Prognose für Ihr Unternehmen.',
      chartDescription: 'Monatliche Budget-, Ist- und Prognosewerte. Dieselben Zahlen stehen in der monatlichen Vergleichstabelle zur Verfügung.',
      updated: 'Beispiel aktualisiert. Prognosezeitraum: ', hypothetical: 'Fiktives Beispiel',
      csvPeriod: 'Monat (JJJJ-MM)', csvCurrency: 'Währung', csvRevenueBudget: 'Budgetumsatz', csvRevenueValue: 'Ist- oder Prognoseumsatz',
      csvRevenueVariance: 'Umsatzabweichung', csvResultBudget: 'Budget-Betriebsergebnis', csvResultValue: 'Ist- oder Prognose-Betriebsergebnis',
      csvResultVariance: 'Ergebnisabweichung', csvGrowth: 'Monatliches Prognosewachstum (%)',
      csvFixedBase: 'Letzte tatsächliche monatliche Fixkosten', csvVariableCost: 'Variable Prognosekosten (%)', csvFixedCost: 'Anpassung prognostizierter Fixkosten (%)',
      actualInsight: 'In diesem Beispiel liegt der Umsatz seit Jahresbeginn über Budget, das Betriebsergebnis jedoch darunter. Neben dem Umsatzwachstum sollten deshalb die Kostenannahmen geprüft werden.',
      resultAbove: 'Das Betriebsergebnis der nächsten zwölf Monate liegt in diesem Szenario über Budget. Die Differenz hängt von den gezeigten Wachstums- und Kostenannahmen ab.',
      resultBelow: 'Das Betriebsergebnis der nächsten zwölf Monate liegt in diesem Szenario unter Budget. Prüfen Sie die Umsatzannahmen sowie den Einfluss variabler Kosten und Fixkosten.',
      resultEqual: 'Das Betriebsergebnis der nächsten zwölf Monate entspricht in diesem Szenario dem Budget. Die Annahmen sollten dennoch regelmäßig überprüft werden.'
    }
  };
  function toCSV(scenario, language = 'en') {
    const text = copy[language] || copy.en;
    const headings = [
      text.hypothetical, text.csvPeriod, text.status, text.csvCurrency,
      text.csvRevenueBudget, text.csvRevenueValue, text.csvRevenueVariance,
      text.csvResultBudget, text.csvResultValue, text.csvResultVariance,
      text.csvFixedBase, text.csvGrowth, text.csvVariableCost, text.csvFixedCost
    ];
    const rows = scenario.rows.map(row => [
      text.hypothetical, row.period, text[row.kind], 'EUR',
      row.budget.revenue, row.value.revenue, row.value.revenue - row.budget.revenue,
      row.budget.operatingResult, row.value.operatingResult, row.value.operatingResult - row.budget.operatingResult,
      ...(row.kind === 'forecast' ? [scenario.fixedCostBase, scenario.assumptions.growth, scenario.assumptions.variableCost, scenario.assumptions.fixedCostChange] : ['', '', '', ''])
    ]);
    const quote = value => '"' + String(value).replace(/"/g, '""') + '"';
    return '\ufeff' + [headings, ...rows].map(row => row.map(quote).join(',')).join('\r\n') + '\r\n';
  }
  function mount(root) {
    if (!root) return null;
    let language = 'en';
    let metric = 'revenue';
    let variancePeriod = 'outlook';
    let scenario;
    let chartWidth = 0;
    const find = selector => root.querySelector(selector);
    const controls = {
      closedMonth: find('#forecast-cutoff'), growth: find('#forecast-growth'),
      variableCost: find('#forecast-variable-cost'), fixedCostChange: find('#forecast-fixed-cost')
    };
    const chart = find('#forecast-chart');
    const locale = () => language === 'de' ? 'de-DE' : 'en-GB';
    const money = (value, signed = false) => new Intl.NumberFormat(locale(), {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0, signDisplay: signed ? 'exceptZero' : 'auto'
    }).format(value);
    const percent = (value, signed = false) => new Intl.NumberFormat(locale(), {
      style: 'percent', maximumFractionDigits: 1, signDisplay: signed ? 'exceptZero' : 'auto'
    }).format(value / 100);
    const dateLabel = (iso, short = false) => new Intl.DateTimeFormat(locale(), {
      month: 'short', year: short ? '2-digit' : 'numeric', timeZone: 'UTC'
    }).format(new Date(iso + '-01T00:00:00Z'));
    const rangeLabel = rows => dateLabel(rows[0].period) + ' – ' + dateLabel(rows[rows.length - 1].period);
    const tone = value => value > 0 ? 'positive' : value < 0 ? 'negative' : '';
    function svgNode(name, attributes = {}, text) {
      const node = document.createElementNS('http://www.w3.org/2000/svg', name);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
      if (text !== undefined) node.textContent = text;
      return node;
    }
    function drawChart() {
      const text = copy[language];
      const width = Math.max(260, Math.round(chart.getBoundingClientRect().width));
      chartWidth = width;
      const height = width < 500 ? 250 : 300;
      const padding = { top: 20, right: 16, bottom: 38, left: 49 };
      const rows = scenario.rows;
      const values = rows.flatMap(row => [row.budget[metric], row.value[metric]]);
      const rawLow = Math.min(0, ...values), rawHigh = Math.max(0, ...values);
      const span = rawHigh - rawLow || 1;
      const low = rawLow < 0 ? rawLow - span * 0.08 : 0;
      const high = rawHigh + span * 0.1;
      const x = index => padding.left + index / (rows.length - 1) * (width - padding.left - padding.right);
      const y = value => padding.top + (high - value) / (high - low) * (height - padding.top - padding.bottom);
      const svg = svgNode('svg', { viewBox: '0 0 ' + width + ' ' + height, role: 'img', 'aria-labelledby': 'forecast-chart-title forecast-chart-description' });
      svg.append(svgNode('title', { id: 'forecast-chart-title' }, text[metric] + ' · ' + text.chartUnit));
      svg.append(svgNode('desc', { id: 'forecast-chart-description' }, text.chartDescription + ' ' + rangeLabel(rows) + '.'));
      const boundary = (x(2) + x(3)) / 2;
      svg.append(svgNode('rect', { x: padding.left, y: padding.top, width: boundary - padding.left, height: height - padding.top - padding.bottom, class: 'forecast-actual-area' }));
      for (let tick = 0; tick <= 4; tick++) {
        const value = low + (high - low) * tick / 4;
        svg.append(svgNode('line', { x1: padding.left, x2: width - padding.right, y1: y(value), y2: y(value), class: 'forecast-grid-line' }));
        svg.append(svgNode('text', { x: padding.left - 9, y: y(value) + 4, 'text-anchor': 'end', class: 'forecast-tick' },
          new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(value / 1000)));
      }
      if (low < 0) svg.append(svgNode('line', { x1: padding.left, x2: width - padding.right, y1: y(0), y2: y(0), class: 'forecast-zero-line' }));
      svg.append(svgNode('line', { x1: boundary, x2: boundary, y1: padding.top, y2: height - padding.bottom, class: 'forecast-cutoff-line' }));
      const monthTicks = width < 400 ? [0, 7, 14] : width < 600 ? [0, 5, 10, 14] : [0, 2, 5, 8, 11, 14];
      for (const index of monthTicks) {
        svg.append(svgNode('text', { x: x(index), y: height - 10, 'text-anchor': index === 14 ? 'end' : 'middle', class: 'forecast-tick forecast-month-tick' }, dateLabel(rows[index].period, true)));
      }
      const line = (indices, key, className) => svgNode('polyline', {
        points: indices.map(index => x(index) + ',' + y(rows[index][key][metric])).join(' '),
        class: className, fill: 'none', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      });
      svg.append(line(rows.map((_, index) => index), 'budget', 'forecast-line-budget'));
      svg.append(line([0, 1, 2], 'value', 'forecast-line-actual'));
      svg.append(line(rows.map((_, index) => index).slice(2), 'value', 'forecast-line-forecast'));
      rows.forEach((row, index) => {
        const point = svgNode('circle', { cx: x(index), cy: y(row.value[metric]), r: index < 3 ? 3.5 : 2.5, class: index < 3 ? 'forecast-point-actual' : 'forecast-point-forecast' });
        point.append(svgNode('title', {}, dateLabel(row.period) + ' · ' + text[row.kind] + ': ' + money(row.value[metric]) + ' · ' + text.budget + ': ' + money(row.budget[metric])));
        svg.append(point);
      });
      chart.replaceChildren(svg);
    }
    function renderTable() {
      const text = copy[language];
      const body = find('#forecast-table tbody');
      const fragment = document.createDocumentFragment();
      scenario.rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.dataset.period = row.period;
        tr.dataset.kind = row.kind;
        const change = variance(row.value[metric], row.budget[metric]);
        const values = [dateLabel(row.period), text[row.kind], money(row.budget[metric]), money(row.value[metric]), money(change.amount, true), change.percent === null ? '—' : percent(change.percent, true)];
        values.forEach((value, index) => {
          const cell = document.createElement(index === 0 ? 'th' : 'td');
          if (index === 0) cell.scope = 'row';
          if (index === 1) cell.className = 'forecast-row-status ' + row.kind;
          if (index > 3) cell.className = tone(change.amount);
          cell.textContent = value;
          tr.append(cell);
        });
        fragment.append(tr);
      });
      body.replaceChildren(fragment);
    }
    function render(announce = false) {
      const text = copy[language];
      scenario = buildScenario(Object.fromEntries(Object.entries(controls).map(([key, input]) => [key, Number(input.value)])));
      root.dataset.forecastStart = scenario.forecast[0].period;
      root.dataset.forecastEnd = scenario.forecast[11].period;
      root.dataset.metric = metric;
      find('#forecast-annual-growth').textContent = text.annualisedLabel + ': ' + percent(scenario.annualisedGrowth, true);
      find('#forecast-fixed-base').textContent = text.fixedBaseLabel + ': ' + money(scenario.fixedCostBase) + ' ' + text.perMonth;
      for (const [key, outputId] of [['growth', 'forecast-growth-value'], ['variableCost', 'forecast-variable-cost-value'], ['fixedCostChange', 'forecast-fixed-cost-value']]) {
        const formatted = percent(scenario.assumptions[key], key !== 'variableCost');
        find('#' + outputId).value = formatted;
        controls[key].setAttribute('aria-valuetext', formatted);
      }
      root.querySelectorAll('[data-forecast-period]').forEach(node => {
        node.textContent = rangeLabel(node.dataset.forecastPeriod === 'actual' ? scenario.history : scenario.forecast);
      });
      const summary = {
        actualRevenue: [scenario.yearToDate.actual.revenue, scenario.yearToDate.budget.revenue],
        actualResult: [scenario.yearToDate.actual.operatingResult, scenario.yearToDate.budget.operatingResult],
        forecastRevenue: [scenario.outlook.forecast.revenue, scenario.outlook.budget.revenue],
        forecastResult: [scenario.outlook.forecast.operatingResult, scenario.outlook.budget.operatingResult]
      };
      Object.entries(summary).forEach(([key, [value, planned]]) => {
        find('[data-kpi="' + key + '"]').textContent = money(value);
        const comparison = find('[data-kpi-comparison="' + key + '"]');
        const change = variance(value, planned);
        comparison.textContent = text.budget + ' ' + money(planned) + ' · ' + money(change.amount, true) + (change.percent === null ? '' : ' (' + percent(change.percent, true) + ')');
        comparison.className = 'forecast-kpi-comparison ' + tone(change.amount);
      });
      root.querySelectorAll('[data-forecast-metric]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.forecastMetric === metric)));
      const historicalInsight = scenario.yearToDate.actual.revenue > scenario.yearToDate.budget.revenue && scenario.yearToDate.actual.operatingResult < scenario.yearToDate.budget.operatingResult ? text.actualInsight + ' ' : '';
      const resultDifference = scenario.outlook.forecast.operatingResult - scenario.outlook.budget.operatingResult;
      find('#forecast-insight').textContent = historicalInsight + (resultDifference > 0 ? text.resultAbove : resultDifference < 0 ? text.resultBelow : text.resultEqual);

      const breakdown = varianceBreakdown(scenario, variancePeriod);
      root.querySelectorAll('[data-bridge]').forEach(node => {
        const key = node.dataset.bridge;
        const effect = !['budgetResult','result'].includes(key);
        node.textContent = money(breakdown[key], effect);
        node.className = effect ? tone(breakdown[key]) : '';
      });
      root.querySelectorAll('[data-variance-period]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.variancePeriod===variancePeriod)));
      find('#bridge-result-label').textContent = variancePeriod === 'outlook' ? text.bridgeForecastResult : text.bridgeActualResult;
      find('#forecast-bridge-period').textContent = rangeLabel(variancePeriod === 'outlook' ? scenario.forecast : scenario.history);
      drawChart();
      renderTable();
      if (announce) find('#forecast-status').textContent = text.updated + rangeLabel(scenario.forecast) + '. ' + text.growthLabel + ': ' + percent(scenario.assumptions.growth) + '. ' + text.variableCostLabel + ': ' + percent(scenario.assumptions.variableCost) + '. ' + text.fixedCostLabel + ': ' + percent(scenario.assumptions.fixedCostChange) + '.';
    }
    function setLanguage(next) {
      if (!copy[next]) return;
      language = next;
      const text = copy[language];
      root.querySelectorAll('[data-fi]').forEach(node => { node.textContent = text[node.dataset.fi]; });
      root.querySelectorAll('[data-f-label]').forEach(node => { node.setAttribute('aria-label', text[node.dataset.fLabel]); });
      find('#forecast-status').textContent = '';
      render();
    }
    Object.values(controls).forEach(input => input.addEventListener(input.tagName === 'SELECT' ? 'change' : 'input', () => render(true)));
    root.querySelectorAll('[data-forecast-metric]').forEach(button => button.addEventListener('click', () => {
      metric = button.dataset.forecastMetric;
      render();
    }));
    root.querySelectorAll('[data-variance-period]').forEach(button => button.addEventListener('click', () => {
      variancePeriod = button.dataset.variancePeriod;
      render();
      find('#forecast-status').textContent = copy[language].bridgeUpdated + (variancePeriod === 'outlook' ? copy[language].bridgeForecast : copy[language].bridgeActual) + '.';
    }));
    find('#forecast-reset').addEventListener('click', () => {
      Object.entries(DEFAULTS).forEach(([key, value]) => { controls[key].value = String(value); });
      metric = 'revenue';
      variancePeriod = 'outlook';
      render(true);
    });
    find('#forecast-download').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([toCSV(scenario, language)], { type: 'text/csv;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'consultix-illustrative-forecast-' + language + '.csv';
      root.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    root.hidden = false;
    setLanguage('en');
    if (typeof ResizeObserver !== 'undefined') {
      const observer = new ResizeObserver(() => {
        if (Math.max(260, Math.round(chart.getBoundingClientRect().width)) !== chartWidth) drawChart();
      });
      observer.observe(chart);
    }
    return { setLanguage };
  }
  return { DEFAULTS, buildScenario, variance, varianceBreakdown, toCSV, mount };
});
