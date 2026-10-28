'use strict';
const CONTACT_EMAIL = 'general@consultix.solutions';
const german = {
  skip:'Zum Inhalt springen', navIntro:'Start', navPractices:'Leistungen', navApproach:'Ansatz', navEngagements:'Zusammenarbeit', navAbout:'Über uns', talk:'Kontakt',
  heroEyebrow:'BOUTIQUE-BERATUNG', heroTitle:'Finanzielle Einblicke,\ndie zur Umsetzung\nführen.',
  heroDescription:'Consultix Solutions hilft wachsenden Unternehmen, finanzielle Erkenntnisse mit Vertrieb und operativer Umsetzung zu verbinden. Wir kombinieren fundierte Analyse mit praktischer Unterstützung bei Finanzen, Prozessen, Daten und Technologie.',
  seePractices:'Unsere vier Fachgebiete', heroFoot:'Unabhängiger Blick. Praktische Unterstützung.', discover:'Consultix kennenlernen',
  audienceEyebrow:'FÜR WEN WIR ARBEITEN', audienceTitle:'Für Unternehmen,\ndie sich weiterentwickeln.',
  audienceLead:'Wir arbeiten mit Gründern, Geschäftsführungen, Finanz- und Betriebsverantwortlichen sowie Vertriebsleitungen in kleinen und mittleren Unternehmen, Start-ups und Scale-ups, die einen konsistenten Überblick über Zahlen, Systeme und Abläufe brauchen.',
  audienceBody:'Wir verbinden fundierte Analyse mit praktischer Umsetzung. Dazu betrachten wir Ihre tatsächlichen Arbeitsabläufe, führen Informationen aus Finanzen, Vertrieb und Betrieb zusammen und unterstützen Ihr Team bei konkreten Verbesserungen.',
  audienceEnd:'Das Ziel sind fundiertere Entscheidungen, verlässlichere Prozesse und Systeme, die Ihre Arbeitsweise unterstützen. Das Wissen und die Verantwortung bleiben dabei in Ihrem Team.',
  practicesEyebrow:'UNSERE LEISTUNGEN', practicesTitle:'Vier verbundene Fachgebiete.',
  practicesDescription:'Jedes Fachgebiet steht für sich. Zusätzlicher Nutzen entsteht durch das Zusammenspiel: Finanzpläne berücksichtigen Vertriebsdaten, Abläufe unterstützen Umsatzziele und Automatisierung erleichtert die tägliche Arbeit.',
  practice1Title:'Strategische Finanzen & Unternehmenssteuerung', practice1Body:'Budgetierung, Finanzplanung, Prognosen, Szenarioanalysen und Management-Reporting geben Ihrer Unternehmensleitung einen klareren Überblick über die Geschäftsentwicklung und anstehende Entscheidungen.',
  p1tag1:'Budgetierung', p1tag2:'Finanzplanung', p1tag3:'Prognosen', p1tag4:'Szenarioanalysen', p1tag5:'Management-Reporting',
  practice2Title:'Revenue & CRM Operations', practice2Body:'CRM-Prozesse, die Gestaltung des Kundenlebenszyklus, Pipeline-Steuerung und Umsatzprognosen helfen Vertriebsteams, mit konsistenten Informationen zu arbeiten. Dazu gehört bei Bedarf die Unterstützung für HubSpot und verbundene Systeme.',
  p2tag1:'CRM & HubSpot', p2tag2:'Kundenlebenszyklus', p2tag3:'Pipeline-Prozesse', p2tag4:'Umsatzprognosen',
  practice3Title:'Betriebliche Abläufe & Systeme', practice3Body:'Wir helfen, Prozesse zu erfassen, Übergaben zwischen Teams zu verbessern und Finanz- und Vertriebssysteme aufeinander abzustimmen. So bleiben Informationen und Verantwortlichkeiten über Abteilungsgrenzen hinweg nachvollziehbar.',
  p3tag1:'Prozessanalyse', p3tag2:'Teamübergaben', p3tag3:'Ressourcenplanung', p3tag4:'Systemabstimmung',
  practice4Title:'KI, Automatisierung & digitale Weiterentwicklung', practice4Body:'Fundierte Bewertungen, verbesserte Arbeitsabläufe und gezielte Automatisierungspiloten: Wir prüfen mit Ihnen, wo neue Technologie nützt, wie sie sich erproben lässt und was Ihr Team für einen verantwortungsvollen Einsatz braucht.',
  p4tag1:'KI-Bereitschaft', p4tag2:'Automatisierung', p4tag3:'Pilotplanung', p4tag4:'Systemauswahl',
  approachEyebrow:'UNSERE ARBEITSWEISE', approachTitle:'Verstehen. Verbinden.\nUmsetzen.',
  approachDescription:'Wir klären, worauf es ankommt, machen Zusammenhänge sichtbar und übersetzen Prioritäten gemeinsam mit Ihrem Team in Veränderungen, die sich im Alltag bewähren.',
  step1Title:'Das Unternehmen verstehen', step1Body:'Wir lernen Ihre Arbeitsweise kennen: Ziele, Rahmenbedingungen und die Realität hinter den Zahlen. Gemeinsam grenzen wir das Problem ein und definieren ein sinnvolles Ergebnis.',
  step2Title:'Informationen verbinden', step2Body:'Wir führen finanzielle, vertriebliche und operative Informationen zu einem stimmigen Bild zusammen, erkennen Lücken und vereinbaren praktische Prioritäten mit den Beteiligten.',
  step3Title:'Verbesserungen umsetzen', step3Body:'Wir arbeiten mit Ihrem Team an Prozessen, Systemen und Berichten, mit klaren Verantwortlichkeiten, angemessenen Tests und einer Übergabe, mit der Ihr Team weiterarbeiten kann.',
  engagementsEyebrow:'ZUSAMMENARBEIT', engagementsTitle:'Flexible Zusammenarbeit.',
  engagementsDescription:'Wählen Sie die Unterstützung, die zu Ihrer Unternehmensphase, Ihrem Team und der anstehenden Aufgabe passt. Prioritäten und Verantwortlichkeiten stimmen wir gemeinsam ab.',
  projectEyebrow:'EINE KLAR UMRISSENE AUFGABE', projectTitle:'Gezielte Projekte',
  projectBody:'Ein vereinbarter Umfang und ein klares Ergebnis: ein überarbeiteter Budgetprozess, ein verbessertes CRM, eine Prozessübersicht oder ein Automatisierungspilot. Wir planen gemeinsam, setzen praktisch um und übergeben eine Lösung, die Ihr Team weiterführen kann.',
  projectFeature1:'Vereinbarter Umfang und klares Ergebnis', projectFeature2:'Praktische Umsetzung', projectFeature3:'Dokumentation und Übergabe an Ihr Team', projectLink:'Ein Projekt besprechen',
  ongoingEyebrow:'EINE KONTINUIERLICHE ZUSAMMENARBEIT', ongoingTitle:'Laufende operative Unterstützung auf Teilzeitbasis',
  ongoingBody:'Praktische Unterstützung für Finanzen und Betrieb als Teil Ihres Führungsrhythmus. Wir begleiten Planung, Reporting und Systeme und passen die vereinbarte Unterstützung an die Entwicklung Ihres Unternehmens an.',
  ongoingFeature1:'Regelmäßige Zusammenarbeit mit Ihrem Team', ongoingFeature2:'Kontinuierliche Planung und Berichterstattung', ongoingFeature3:'Klare Verantwortung und Kontinuität', ongoingLink:'Laufende Unterstützung besprechen',
  topicsLabel:'Ein Ausgangspunkt für das Gespräch', topic1:'Finanzplanung & Unternehmenssteuerung', topic2:'CRM & RevOps optimieren', topic3:'Vertrieb und Finanzen verbinden', topic4:'Systeme und KI-Potenziale bewerten',
  aboutEyebrow:'ÜBER CONSULTIX', aboutTitle:'Ein fundierter Blick.\nPraktische Verantwortung.',
  aboutLead:'Finanzielle Ergebnisse werden durch Vertriebsaktivitäten, operative Entscheidungen und die dahinterliegenden Systeme geprägt. Gute Beratung macht diese Zusammenhänge sichtbar und nutzbar.',
  aboutBody:'Consultix Solutions verbindet strategische Finanzen, Revenue Operations und Unternehmenssysteme, unterstützt durch gezielte KI und Automatisierung. Wir arbeiten direkt mit den Menschen, die von Veränderungen betroffen sind, erläutern Grundlagen und Abwägungen und verbinden Empfehlungen mit Umsetzung und Verantwortung.',
  value1Title:'Klarheit', value1Body:'Komplexe Informationen verständlich machen und die entscheidenden Details erhalten.',
  value2Title:'Integrität', value2Body:'Fakten, Annahmen und Grenzen offen erläutern.',
  value3Title:'Zusammenarbeit', value3Body:'Mit den Menschen arbeiten, die Veränderungen nutzen und weiterführen.',
  value4Title:'Verantwortung', value4Body:'Empfehlungen klare Zuständigkeiten und einen praktischen Weg in den Alltag geben.',
  value5Title:'Fortschritt', value5Body:'Technologie dort einsetzen, wo sich ihr Nutzen prüfen und belegen lässt.',
  contactEyebrow:'KONTAKT', contactTitle:'Was möchten Sie\nvoranbringen?',
  contactDescription:'Erzählen Sie uns, wo Ihr Unternehmen heute steht und was Sie verbessern möchten. In einem ersten Gespräch lässt sich klären, wo Unterstützung sinnvoll wäre.',
  copyEmail:'E-Mail-Adresse kopieren', formTitle:'Ein Gespräch beginnen', formIntro:'Mit wenigen Angaben bereiten Sie eine Nachricht in Ihrem E-Mail-Programm vor.',
  nameLabel:'Ihr Name', emailLabel:'E-Mail-Adresse', companyLabel:'Unternehmen (optional)', interestLabel:'Worüber möchten Sie sprechen?', interestGeneral:'Ein erstes Gespräch', interestProject:'Ein klar umrissenes Projekt', interestOngoing:'Laufende operative Unterstützung', messageLabel:'Ein paar Worte zu Ihren Prioritäten', formSubmit:'E-Mail-Entwurf öffnen', formNote:'Ihr E-Mail-Programm öffnet einen Entwurf. Prüfen und versenden Sie die Nachricht dort.',
  reopenDraft:'Den E-Mail-Entwurf erneut öffnen', footerDescription:'Finanzielle Einblicke, verbunden mit praktischer Umsetzung.', backTop:'Nach oben', footerScope:'Unternehmensplanung, Analysen, Reporting und operative Unterstützung.'
};
const translatedElements = [...document.querySelectorAll('[data-i]')];
const english = Object.fromEntries(translatedElements.map(element => [element.dataset.i, element.textContent]));
const messages = {
  en:{brandHome:'Consultix Solutions home',menuOpen:'Open menu',menuClose:'Close menu',navigation:'Main navigation',languageGroup:'Website language',discover:'Discover Consultix',copied:'Email address copied.',copyFallback:'Select general@consultix.solutions above and copy it.',required:'Please complete this field.',draftReady:'Your draft is prepared. Complete sending in your email app. You can also email general@consultix.solutions directly.',subject:'Website enquiry',name:'Name',email:'Email',company:'Company',interest:'Topic',message:'Message'},
  de:{brandHome:'Consultix Solutions – Startseite',menuOpen:'Menü öffnen',menuClose:'Menü schließen',navigation:'Hauptnavigation',languageGroup:'Sprache der Website',discover:'Consultix kennenlernen',copied:'E-Mail-Adresse kopiert.',copyFallback:'Markieren und kopieren Sie oben general@consultix.solutions.',required:'Bitte füllen Sie dieses Feld aus.',draftReady:'Ihr Entwurf ist vorbereitet. Versenden Sie ihn in Ihrem E-Mail-Programm. Sie können auch direkt an general@consultix.solutions schreiben.',subject:'Website-Anfrage',name:'Name',email:'E-Mail',company:'Unternehmen',interest:'Thema',message:'Nachricht'}
};
const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
let language = 'en';
function setMenu(open,restoreFocus=false){
  header.classList.toggle('menu-open',open);
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.setAttribute('aria-label',messages[language][open?'menuClose':'menuOpen']);
  if(restoreFocus)menuToggle.focus();
}
function setLanguage(next){
  if(!['en','de'].includes(next))return;
  language=next;
  document.documentElement.lang=next;
  const dictionary=next==='de'?german:english;
  translatedElements.forEach(element=>{element.textContent=dictionary[element.dataset.i]??english[element.dataset.i];});
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===next)));
  document.querySelectorAll('[data-label]').forEach(element=>element.setAttribute('aria-label',messages[next][element.dataset.label]));
  menuToggle.setAttribute('aria-label',messages[next][header.classList.contains('menu-open')?'menuClose':'menuOpen']);
  document.title=next==='de'?'Consultix Solutions — Finanzielle Einblicke, verbunden mit Umsetzung':'Consultix Solutions — Financial insight, connected to execution';
  document.querySelector('meta[name="description"]').content=next==='de'?'Consultix Solutions verbindet finanzielle Erkenntnisse mit praktischen Verbesserungen für Finanzen, Vertrieb und Unternehmenssysteme.': 'Consultix Solutions connects financial insight with practical improvements across finance, revenue operations and business systems.';
  document.querySelector('meta[property="og:title"]').content=document.title;
  document.getElementById('copy-status').textContent='';
  document.getElementById('form-status').textContent='';
  document.getElementById('email-draft-link').hidden=true;
  try{localStorage.setItem('consultix-language',next);}catch{}
}
document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
document.querySelectorAll('#main-nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('menu-open'))setMenu(false,true);});
document.addEventListener('click',event=>{if(header.classList.contains('menu-open')&&!header.contains(event.target))setMenu(false);});
window.addEventListener('resize',()=>{if(window.innerWidth>1000)setMenu(false);});
const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>48);
window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
document.querySelectorAll('[data-engagement]').forEach(link=>link.addEventListener('click',()=>{document.getElementById('interest').value=link.dataset.engagement;}));
document.getElementById('copy-email').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(CONTACT_EMAIL);document.getElementById('copy-status').textContent=messages[language].copied;}
  catch{document.getElementById('copy-status').textContent=messages[language].copyFallback;}
});
const form=document.getElementById('enquiry-form');
form.addEventListener('input',event=>{if('setCustomValidity' in event.target)event.target.setCustomValidity('');document.getElementById('email-draft-link').hidden=true;document.getElementById('form-status').textContent='';});
form.addEventListener('submit',event=>{
  event.preventDefault();
  for(const id of ['name','message']){
    const field=document.getElementById(id);
    if(!field.value.trim()){field.setCustomValidity(messages[language].required);field.reportValidity();return;}
  }
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const text=messages[language];
  const topic=document.getElementById('interest').selectedOptions[0].textContent;
  const subject=text.subject+' — '+topic;
  const body=[text.name+': '+String(data.get('name')).trim(),text.email+': '+String(data.get('email')).trim(),...(String(data.get('company')).trim()?[text.company+': '+String(data.get('company')).trim()]:[]),text.interest+': '+topic,'',String(data.get('message')).trim()].join('\n');
  const url='mailto:'+CONTACT_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  document.getElementById('form-status').textContent=text.draftReady;
  const draftLink=document.getElementById('email-draft-link');
  draftLink.href=url;draftLink.hidden=false;draftLink.click();
});
document.getElementById('year').textContent=String(new Date().getFullYear());
try{const saved=localStorage.getItem('consultix-language');if(saved==='de')setLanguage('de');}catch{}
