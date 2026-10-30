'use strict';
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ConsultixMetrics = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function calculate(metric, inputs) {
    const required = { margin: ['revenue','delivery'], retention: ['opening','expansion','contraction','churn'], runway: ['cash','receipts','payments'] }[metric];
    if (!required) throw new RangeError('Unknown metric.');
    if (!required.every(key => Number.isFinite(inputs[key]) && inputs[key] >= 0 && inputs[key] <= 1e9)) return { error: 'invalidInputs' };
    if (metric === 'margin') {
      if (inputs.revenue === 0) return { error: 'zeroRevenue' };
      return { value: (inputs.revenue - inputs.delivery) / inputs.revenue * 100, amountA: inputs.revenue, amountB: inputs.delivery };
    }
    if (metric === 'retention') {
      if (inputs.opening === 0) return { error: 'zeroOpening' };
      if (inputs.contraction + inputs.churn > inputs.opening) return { error: 'excessLosses' };
      const closing = inputs.opening + inputs.expansion - inputs.contraction - inputs.churn;
      return { value: closing / inputs.opening * 100, amountA: inputs.opening, amountB: closing };
    }
    const burn = inputs.payments - inputs.receipts;
    if (burn <= 0) return { error: 'nonPositiveBurn' };
    return { value: inputs.cash / burn, amountA: inputs.cash, amountB: burn };
  }
  const copy = {
    en: {
      compactTitle: 'Explore KPI definitions',
      eyebrow: 'METRIC EXPLORER · ILLUSTRATIVE ASSUMPTIONS', title: 'A useful metric starts with a clear definition.',
      intro: 'Optional examples of gross margin, revenue retention and cash runway. Adjust hypothetical inputs to explore the definitions and calculations.',
      margin: 'Gross margin', retention: 'Net revenue retention', runway: 'Cash runway',
      revenue: 'Revenue · EUR / month', delivery: 'Direct delivery costs · EUR / month',
      opening: 'Opening MRR · EUR / month', expansion: 'Expansion MRR · EUR / month', contraction: 'Contraction MRR · EUR / month', churn: 'Churned MRR · EUR / month',
      cash: 'Available cash · EUR', receipts: 'Monthly cash receipts · EUR', payments: 'Monthly cash payments · EUR',
      marginDefinition: 'Revenue less directly attributable delivery costs, divided by revenue. This example excludes fixed overheads, financing and tax; it is not an operating or net profit margin.',
      retentionDefinition: 'Closing monthly recurring revenue from the opening customer cohort, divided by its opening MRR. Expansion is included; new customers are excluded. Align currency, MRR definitions and the measurement period.',
      runwayDefinition: 'Available cash divided by positive monthly net cash burn. This simple estimate assumes stable receipts and payments, unrestricted cash and no new financing. It does not replace a timed cash-flow forecast.',
      marginFormula: '(Revenue − direct delivery costs) ÷ revenue × 100',
      retentionFormula: '(Opening MRR + expansion − contraction − churn) ÷ opening MRR × 100',
      runwayFormula: 'Available cash ÷ (monthly payments − monthly receipts)',
      marginA: 'Revenue', marginB: 'Direct delivery costs', retentionA: 'Opening cohort MRR', retentionB: 'Closing MRR · same cohort', runwayA: 'Available cash', runwayB: 'Monthly net cash burn',
      inputs: 'Sample inputs', result: 'Calculated result', months: 'months', reset: 'Reset all examples',
      invalidInputs: 'Enter a value between 0 and 1,000,000,000 in each field.', zeroRevenue: 'Gross margin is undefined when revenue is zero.',
      zeroOpening: 'Retention is undefined when opening MRR is zero.', excessLosses: 'Contraction and churn cannot exceed the opening cohort MRR in this simplified example.',
      nonPositiveBurn: 'No positive net cash burn: this formula does not give a finite runway. Review cash timing and commitments separately.',
      note: 'All amounts are hypothetical EUR inputs. Calculations use the entered amounts; percentages and months display to one decimal place. Inputs stay in your browser.',
      updated: 'Example updated: '
    },
    de: {
      compactTitle: 'Kennzahlen und Beispiele ansehen',
      eyebrow: 'KENNZAHLEN ENTDECKEN · FIKTIVE ANNAHMEN', title: 'Eine nützliche Kennzahl beginnt mit einer klaren Definition.',
      intro: 'Optionale Beispiele zu Bruttomarge, Umsatzbindung und Liquiditätsreichweite. Ändern Sie fiktive Eingaben, um Definitionen und Berechnungen nachzuvollziehen.',
      margin: 'Bruttomarge', retention: 'Nettoumsatzbindung', runway: 'Liquiditätsreichweite',
      revenue: 'Umsatz · EUR / Monat', delivery: 'Direkte Leistungskosten · EUR / Monat',
      opening: 'MRR zu Beginn · EUR / Monat', expansion: 'Zusätzlicher MRR · EUR / Monat', contraction: 'Reduzierter MRR · EUR / Monat', churn: 'Gekündigter MRR · EUR / Monat',
      cash: 'Verfügbare Liquidität · EUR', receipts: 'Monatliche Einzahlungen · EUR', payments: 'Monatliche Auszahlungen · EUR',
      marginDefinition: 'Umsatz abzüglich direkt zurechenbarer Leistungskosten, geteilt durch den Umsatz. Das Beispiel lässt Fixkosten, Finanzierung und Steuern unberücksichtigt. Es zeigt keine Betriebs- oder Nettogewinnmarge.',
      retentionDefinition: 'Monatlich wiederkehrender Umsatz der zu Beginn bestehenden Kunden am Periodenende, geteilt durch deren MRR zu Beginn. Erweiterungen zählen dazu, Neukunden nicht. Währung, MRR-Definitionen und Messzeitraum müssen übereinstimmen.',
      runwayDefinition: 'Verfügbare Liquidität geteilt durch den positiven monatlichen Netto-Liquiditätsverbrauch. Die einfache Schätzung unterstellt stabile Ein- und Auszahlungen, frei verfügbare Mittel und keine neue Finanzierung. Sie ersetzt keine zeitbezogene Liquiditätsplanung.',
      marginFormula: '(Umsatz − direkte Leistungskosten) ÷ Umsatz × 100',
      retentionFormula: '(MRR zu Beginn + Erweiterungen − Reduzierungen − Kündigungen) ÷ MRR zu Beginn × 100',
      runwayFormula: 'Verfügbare Liquidität ÷ (monatliche Auszahlungen − Einzahlungen)',
      marginA: 'Umsatz', marginB: 'Direkte Leistungskosten', retentionA: 'MRR der Anfangskohorte', retentionB: 'MRR am Ende · gleiche Kohorte', runwayA: 'Verfügbare Liquidität', runwayB: 'Monatlicher Netto-Liquiditätsverbrauch',
      inputs: 'Beispielwerte', result: 'Berechnetes Ergebnis', months: 'Monate', reset: 'Alle Beispiele zurücksetzen',
      invalidInputs: 'Geben Sie in jedem Feld einen Wert zwischen 0 und 1.000.000.000 ein.', zeroRevenue: 'Bei einem Umsatz von null ist die Bruttomarge nicht definiert.',
      zeroOpening: 'Bei einem MRR von null zu Beginn ist die Umsatzbindung nicht definiert.', excessLosses: 'Reduzierungen und Kündigungen dürfen in diesem vereinfachten Beispiel den MRR der Anfangskohorte nicht übersteigen.',
      nonPositiveBurn: 'Kein positiver Netto-Liquiditätsverbrauch: Die Formel ergibt keine endliche Reichweite. Zahlungszeitpunkte und Verpflichtungen müssen separat betrachtet werden.',
      note: 'Alle Beträge sind fiktive EUR-Eingaben. Gerechnet wird mit den eingegebenen Beträgen; Prozentwerte und Monate erscheinen mit einer Nachkommastelle. Ihre Eingaben bleiben im Browser.',
      updated: 'Beispiel aktualisiert: '
    }
  };
  function mount(root) {
    if (!root) return null;
    let language = 'en', metric = 'margin';
    const find = selector => root.querySelector(selector);
    const inputs = [...root.querySelectorAll('input')];
    const buttons = [...root.querySelectorAll('[data-metric]')];
    function render(announce = false) {
      const text = copy[language], locale = language === 'de' ? 'de-DE' : 'en-GB';
      root.querySelectorAll('[data-mi]').forEach(node => { node.textContent = text[node.dataset.mi]; });
      buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.metric === metric)));
      root.querySelectorAll('[data-metric-panel]').forEach(panel => { panel.hidden = panel.dataset.metricPanel !== metric; });
      const panel = find('[data-metric-panel=' + metric + ']');
      const fields = [...panel.querySelectorAll('input')];
      const values = Object.fromEntries(fields.map(input => [input.dataset.input, input.value.trim() === '' ? NaN : input.valueAsNumber]));
      const result = calculate(metric, values);
      const money = value => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(value);
      const number = value => new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
      const output = find('#metric-value');
      output.setAttribute('for', fields.map(input => input.id).join(' '));
      output.textContent = result.error ? '—' : number(result.value) + (metric === 'runway' ? ' ' + text.months : '%');
      find('#metric-result-name').textContent = text[metric];
      find('#metric-formula').textContent = text[metric + 'Formula'];
      find('#metric-definition').textContent = text[metric + 'Definition'];
      find('#metric-error').textContent = result.error ? text[result.error] : '';
      find('.metric-bars').hidden = Boolean(result.error);
      find('#metric-equation').hidden = Boolean(result.error);
      if (!result.error) {
        let equation;
        if (metric === 'margin') equation = '(' + money(values.revenue) + ' − ' + money(values.delivery) + ') ÷ ' + money(values.revenue) + ' × 100';
        else if (metric === 'retention') equation = '(' + money(values.opening) + ' + ' + money(values.expansion) + ' − ' + money(values.contraction) + ' − ' + money(values.churn) + ') ÷ ' + money(values.opening) + ' × 100';
        else equation = money(values.cash) + ' ÷ (' + money(values.payments) + ' − ' + money(values.receipts) + ')';
        find('#metric-equation').textContent = equation + ' = ' + output.textContent;
        const max = Math.max(result.amountA, result.amountB, 1);
        for (const [key, amount] of [['A',result.amountA], ['B',result.amountB]]) {
          find('[data-metric-bar-label=' + key + ']').textContent = text[metric + key];
          find('[data-metric-bar-value=' + key + ']').textContent = money(amount);
          find('[data-metric-bar=' + key + ']').style.width = (amount / max * 100) + '%';
        }
      }
      if (announce) find('[data-metric-status]').textContent = text.updated + text[metric] + '. ' + (result.error ? text[result.error] : output.textContent);
    }
    buttons.forEach(button => button.addEventListener('click', () => { metric = button.dataset.metric; render(true); }));
    inputs.forEach(input => {
      input.addEventListener('input', () => render());
      input.addEventListener('change', () => render(true));
    });
    find('#metric-reset').addEventListener('click', () => { inputs.forEach(input => { input.value = input.defaultValue; }); render(true); });
    root.hidden = false;
    render();
    return { setLanguage(next) { if (!copy[next]) return; language = next; render(); find('[data-metric-status]').textContent = ''; } };
  }
  return { calculate, mount };
});
