'use strict';
const CONTACT_EMAIL = 'general@consultix.solutions';
const {en: english, de: german} = window.ConsultixCopy;
const translatedElements = [...document.querySelectorAll('[data-i]')];
const messages = {
  en:{brandHome:'Consultix Solutions home',menuOpen:'Open menu',menuClose:'Close menu',navigation:'Main navigation',languageGroup:'Website language',discover:'Discover Consultix',copied:'Email address copied.',copyFallback:'Select general@consultix.solutions above and copy it.',required:'Please complete this field.',draftReady:'Your draft is prepared. Complete sending in your email app. You can also email general@consultix.solutions directly.',selected:'Selected: ',ratingOutOf:'out of 5 stars',subject:'Website enquiry',name:'Name',email:'Email',company:'Company',interest:'Topic',message:'Message'},
  de:{brandHome:'Consultix Solutions – Startseite',menuOpen:'Menü öffnen',menuClose:'Menü schließen',navigation:'Hauptnavigation',languageGroup:'Sprache der Website',discover:'Consultix kennenlernen',copied:'E-Mail-Adresse kopiert.',copyFallback:'Markieren und kopieren Sie oben general@consultix.solutions.',required:'Bitte füllen Sie dieses Feld aus.',draftReady:'Ihr Entwurf ist vorbereitet. Versenden Sie ihn in Ihrem E-Mail-Programm. Sie können auch direkt an general@consultix.solutions schreiben.',selected:'Ausgewählt: ',ratingOutOf:'von 5 Sternen',subject:'Website-Anfrage',name:'Name',email:'E-Mail',company:'Unternehmen',interest:'Thema',message:'Nachricht'}
};
const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
let language = 'en';
const metricExplorer = window.ConsultixMetrics.mount(document.getElementById('metric-explorer'));
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
  const canonical='https://consultix.solutions/'+(next==='de'?'de/':'');
  document.querySelector('link[rel=canonical]').href=canonical;
  document.querySelector('meta[property="og:url"]').content=canonical;
  document.querySelector('meta[property="og:description"]').content=next==='de'?'Praktische Unterstützung für Finanzen, operative Abläufe und Unternehmenssysteme.':'Practical support for finance, operations and business systems.';
  if(location.protocol!=='file:'){
    try{history.replaceState(null,'',(next==='de'?'/de/':'/')+location.search+location.hash);}catch{}
  }
  metricExplorer?.setLanguage(next);
  credentialCarousel.setLanguage(next);
  choiceSelectors.forEach(selector=>selector.clearStatus());
  renderApprovedTestimonials(approvedTestimonials,next);
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
document.querySelectorAll('[data-engagement]').forEach(link=>link.addEventListener('click',()=>{
  const interest=document.getElementById('interest');
  interest.value=link.dataset.engagement;
  interest.dispatchEvent(new Event('input',{bubbles:true}));
}));
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
form.hidden=false;

// Genuine feedback only. Approval must cover the exact quotation, attribution,
// engagement context, source and both translations. No example quotes ship here.
// Required: approved, name, quote.en/de, context.en/de, source.label.en/de,
// predatesConsultix (explicit boolean). Optional: title.en/de, company, source.url,
// and an actual customer-supplied integer rating from 1 to 5.
const approvedTestimonials = [];
let testimonialIndex = 0;
let testimonialSignature = '';
function renderApprovedTestimonials(entries, nextLanguage) {
  const section = document.getElementById('testimonials');
  const carousel = section.querySelector('.testimonial-carousel');
  const cards = document.getElementById('testimonial-cards');
  const controls = document.getElementById('testimonial-controls');
  const previous = document.getElementById('testimonial-previous');
  const next = document.getElementById('testimonial-next');
  const position = document.getElementById('testimonial-position');
  const text = nextLanguage === 'de' ? {
    carousel: 'Karussell', slide: 'Zitat', of: 'von', previous: 'Zurück zum vorherigen Zitat', next: 'Weiter zum nächsten Zitat',
    earlier: 'Rückmeldung zur Arbeit eines Gründungsmitglieds vor der Gründung von Consultix.'
  } : {
    carousel: 'carousel', slide: 'Quotation', of: 'of', previous: 'Previous testimonial', next: 'Next testimonial',
    earlier: 'Feedback about a founder’s work before Consultix was established.'
  };
  const valid = (Array.isArray(entries) ? entries : []).filter(entry => entry && entry.approved === true &&
    typeof entry.name === 'string' && entry.name.trim() && typeof entry.predatesConsultix === 'boolean' &&
    ['en','de'].every(locale => typeof entry.quote?.[locale] === 'string' && entry.quote[locale].trim() &&
      typeof entry.context?.[locale] === 'string' && entry.context[locale].trim() &&
      typeof entry.source?.label?.[locale] === 'string' && entry.source.label[locale].trim())).slice(0,5);
  const signature = JSON.stringify(valid.map(entry => [entry.name, entry.quote.en]));
  if (signature !== testimonialSignature) testimonialIndex = 0;
  testimonialSignature = signature;
  testimonialIndex = Math.min(testimonialIndex, Math.max(0, valid.length - 1));
  const fragment = document.createDocumentFragment();
  valid.forEach((entry, index) => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.id = 'testimonial-slide-' + index;
    card.setAttribute('role','group');
    card.setAttribute('aria-roledescription',text.slide);
    card.setAttribute('aria-label',(index + 1) + ' ' + text.of + ' ' + valid.length);
    const mark = document.createElement('span');
    mark.className = 'testimonial-mark'; mark.textContent = '“'; mark.setAttribute('aria-hidden','true');
    card.append(mark);
    if (Number.isInteger(entry.rating) && entry.rating >= 1 && entry.rating <= 5) {
      const stars = document.createElement('div');
      stars.className = 'testimonial-rating'; stars.setAttribute('role','img');
      stars.setAttribute('aria-label',entry.rating + ' ' + messages[nextLanguage].ratingOutOf);
      stars.textContent = '★'.repeat(entry.rating) + '☆'.repeat(5 - entry.rating);
      card.append(stars);
    }
    const quote = document.createElement('blockquote'); quote.textContent = entry.quote[nextLanguage];
    const name = document.createElement('p'); name.className = 'testimonial-name'; name.textContent = entry.name;
    const attribution = [entry.title?.[nextLanguage], entry.company].filter(value => typeof value === 'string' && value.trim());
    if (attribution.length) name.textContent += ' · ' + attribution.join(' · ');
    const context = document.createElement('p'); context.className = 'testimonial-context'; context.textContent = entry.context[nextLanguage];
    card.append(quote,name,context);
    if (entry.predatesConsultix) {
      const origin = document.createElement('p'); origin.className = 'testimonial-origin'; origin.textContent = text.earlier; card.append(origin);
    }
    let safeURL = null;
    if (entry.source.url) {
      try { const url = new URL(entry.source.url); if (url.protocol === 'https:') safeURL = url.href; } catch {}
    }
    const source = document.createElement(safeURL ? 'a' : 'p');
    source.className = 'testimonial-source'; source.textContent = entry.source.label[nextLanguage];
    if (safeURL) { source.href = safeURL; source.target = '_blank'; source.rel = 'noopener noreferrer'; }
    card.append(source); fragment.append(card);
  });
  cards.replaceChildren(fragment);
  section.hidden = valid.length === 0;
  controls.hidden = valid.length <= 1;
  carousel.setAttribute('aria-roledescription',text.carousel);
  previous.setAttribute('aria-label',text.previous); next.setAttribute('aria-label',text.next);
  function show(index) {
    if (index < 0 || index >= valid.length) return;
    if (cards.contains(document.activeElement)) carousel.focus({preventScroll:true});
    testimonialIndex = index;
    [...cards.children].forEach((card, i) => { card.hidden = i !== index; });
    previous.disabled = index === 0; next.disabled = index === valid.length - 1;
    position.textContent = (index + 1) + ' ' + text.of + ' ' + valid.length;
    if (document.activeElement === previous && previous.disabled && !next.disabled) next.focus({preventScroll:true});
    else if (document.activeElement === next && next.disabled && !previous.disabled) previous.focus({preventScroll:true});
  }
  previous.onclick = () => show(testimonialIndex - 1);
  next.onclick = () => show(testimonialIndex + 1);
  carousel.onkeydown = event => {
    const target = {ArrowLeft:testimonialIndex - 1, ArrowRight:testimonialIndex + 1, Home:0, End:valid.length - 1}[event.key];
    if (target !== undefined) { event.preventDefault(); show(target); }
  };
  if (valid.length) show(testimonialIndex);
  else position.textContent = '';
}
function setupChoices(id) {
  const root = document.getElementById(id);
  if (!root) return null;
  const buttons = [...root.querySelectorAll('[data-choice]')];
  const panels = [...root.querySelectorAll('[data-panel]')];
  const status = root.querySelector('[data-choice-status]');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.setAttribute('aria-pressed',String(item===button)));
    panels.forEach(panel => { panel.hidden=panel.dataset.panel!==button.dataset.choice; });
    const selected = panels.find(panel=>!panel.hidden);
    status.textContent=messages[language].selected+selected.querySelector('h3').textContent;
  }));
  root.hidden=false;
  return { clearStatus() { status.textContent=''; } };
}

// A manual image rail: native swipe/scroll, keyboard and buttons, never autoplay.
function setupCredentialCarousel() {
  const section = document.getElementById('qualifications');
  const track = section.querySelector('.credential-track');
  const cards = [...track.querySelectorAll('.credential')];
  const controls = section.querySelector('.credential-controls');
  const previous = section.querySelector('#credential-previous');
  const next = section.querySelector('#credential-next');
  const position = section.querySelector('#credential-position');
  let locale = 'en';
  let frame = 0;
  function update() {
    const bounds = track.getBoundingClientRect();
    const visible = cards.map((card,index) => {
      const box = card.getBoundingClientRect();
      const intersection = Math.max(0,Math.min(box.right,bounds.right)-Math.max(box.left,bounds.left));
      return intersection >= box.width * .6 ? index + 1 : null;
    }).filter(Boolean);
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const first = visible[0] || 1;
    const last = visible.at(-1) || first;
    position.textContent = first + (first === last ? '' : '–' + last) + (locale === 'de' ? ' von ' : ' of ') + cards.length;
  }
  function scheduleUpdate() {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; update(); });
  }
  function move(direction) {
    const step = cards[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0);
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    track.scrollBy({left:direction * step,behavior});
  }
  previous.addEventListener('click',() => move(-1));
  next.addEventListener('click',() => move(1));
  track.addEventListener('scroll',scheduleUpdate,{passive:true});
  track.addEventListener('keydown',event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1);
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      track.scrollTo({left:event.key === 'Home' ? 0 : track.scrollWidth,behavior});
    }
  });
  if (typeof ResizeObserver === 'function') new ResizeObserver(scheduleUpdate).observe(track);
  else window.addEventListener('resize',scheduleUpdate);
  document.fonts?.ready.then(scheduleUpdate);
  controls.hidden = false;
  track.tabIndex = 0;
  update();
  return {
    setLanguage(nextLanguage) {
      locale = nextLanguage;
      track.removeAttribute('aria-labelledby');
      track.setAttribute('aria-label',window.ConsultixCopy[locale].credentialsBrowse);
      section.querySelector('.credential-carousel').setAttribute('aria-roledescription',locale === 'de' ? 'Karussell' : 'carousel');
      update();
    }
  };
}
const choiceSelectors = ['challenge-finder','alignment-flow','business-guide'].map(setupChoices).filter(Boolean);
const credentialCarousel = setupCredentialCarousel();
renderApprovedTestimonials(approvedTestimonials,language);

document.getElementById('year').textContent=String(new Date().getFullYear());
let initialLanguage=/^\/de(?:\/|$)/.test(location.pathname)||document.documentElement.lang==='de'?'de':'en';
if(location.protocol==='file:'){
  try{if(localStorage.getItem('consultix-language')==='de')initialLanguage='de';}catch{}
}
setLanguage(initialLanguage);
