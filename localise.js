'use strict';
const copy = require('./content.js');
const escape = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

// data-i is deliberately restricted to text-only elements. Keeping translations
// here makes both language pages readable without JavaScript or external tools.
function localise(html, language = 'en') {
  if (!copy[language]) throw new RangeError('Unknown language.');
  html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-i="([^"]+)"[^>]*)>[^<]*<\/\1>/g, (match, tag, attributes, key) => {
    if (typeof copy[language][key] !== 'string') throw new Error('Missing translation: ' + key);
    return '<' + tag + attributes + '>' + escape(copy[language][key]) + '</' + tag + '>';
  });
  html = html.replace('<html lang="en">','<html lang="' + language + '">');
  if (language === 'de') {
    html = html.replace('<title>Consultix Solutions — Financial insight, connected to execution</title>', '<title>Consultix Solutions — Finanzielle Einblicke, verbunden mit Umsetzung</title>');
    html = html.replace('property="og:title" content="Consultix Solutions — Financial insight, connected to execution"','property="og:title" content="Consultix Solutions — Finanzielle Einblicke, verbunden mit Umsetzung"');
    html = html.replace('rel="canonical" href="https://consultix.solutions/"','rel="canonical" href="https://consultix.solutions/de/"');
    html = html.replace('property="og:url" content="https://consultix.solutions/"','property="og:url" content="https://consultix.solutions/de/"');
    html = html.replace('name="description" content="Consultix Solutions connects financial insight with practical improvements across finance, revenue operations and business systems."','name="description" content="Consultix Solutions verbindet finanzielle Erkenntnisse mit praktischen Verbesserungen für Finanzen, Vertrieb und Unternehmenssysteme."');
    html = html.replace('property="og:description" content="Practical support for finance, operations and business systems."','property="og:description" content="Praktische Unterstützung für Finanzen, operative Abläufe und Unternehmenssysteme."');
    const labels = {brandHome:'Consultix Solutions – Startseite',navigation:'Hauptnavigation',languageGroup:'Sprache der Website',discover:'Consultix kennenlernen'};
    html = html.replace(/<([a-z][\w-]*)\b([^>]*\bdata-label="([^"]+)"[^>]*)>/g, (match, tag, attributes, key) => labels[key] ? '<' + tag + attributes.replace(/aria-label="[^"]*"/, 'aria-label="' + escape(labels[key]) + '"') + '>' : match);
    html = html.replace('data-language="en" aria-pressed="true"','data-language="en" aria-pressed="false"').replace('data-language="de" aria-pressed="false"','data-language="de" aria-pressed="true"');
    html = html.replace('aria-label="Open menu"','aria-label="Menü öffnen"');
    html = html.replace('For enquiries, email','Für Anfragen schreiben Sie an').replace('JavaScript enables language selection and the email draft form.','JavaScript ermöglicht die Sprachauswahl und das Formular für E-Mail-Entwürfe.');
  }
  return html;
}
module.exports = {localise};
