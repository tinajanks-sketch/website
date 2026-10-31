'use strict';
const fs=require('node:fs'),path=require('node:path');
const shared=require('../content.js');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const data=file=>'data:'+({'.woff2':'font/woff2','.svg':'image/svg+xml'}[path.extname(file)])+';base64,'+fs.readFileSync(path.join(root,file)).toString('base64');
const css=read('design-e/style.css').replace(/url\("(\.\.\/assets\/|\.\/assets\/)([a-z0-9.-]+)"\)/g,(_,prefix,file)=>'url("'+data(prefix.startsWith('..')?'assets/'+file:'design-e/assets/'+file)+'")');
const supplemental={
 en:{previewTitle:'Version E design direction',navigationLabel:'Main navigation',otherLanguage:'de',otherLanguageUpper:'DE',openMenu:'Open menu',regionLabel:'Independent consulting · Europe & US',heroHeading:'Financial planning for<br> the <em>decisions</em> ahead.',serviceHeading:'What needs to<br> work better?',reviewHeading:'Start with<br> a clearer picture.',reviewCta:'Discuss a review',supportHeading:'A defined project.<br> Or a place on your team.',projectHeading:'Focused projects',backTop:'Back to top',serviceLink:'Discuss this service'},
 de:{previewTitle:'Version E Designentwurf',navigationLabel:'Hauptnavigation',otherLanguage:'en',otherLanguageUpper:'EN',openMenu:'Menü öffnen',regionLabel:'Unabhängige Beratung · Europa & USA',heroHeading:'Finanzplanung für<br> die nächsten <em>Entscheidungen.</em>',serviceHeading:'Was soll<br> besser funktionieren?',reviewHeading:'Beginnen wir mit<br> einem klareren Bild.',reviewCta:'Eine Analyse besprechen',supportHeading:'Ein klar umrissenes Projekt.<br> Oder laufende Unterstützung.',projectHeading:'Fokussierte Projekte',backTop:'Nach oben',serviceLink:'Diese Leistung besprechen'}
};
for(const language of ['en','de']){
 const c=shared[language],extra=supplemental[language];
 const serviceRows=Array.from({length:5},(_,index)=>{const number=index+1;return'<details class="service-item"><summary><span class="service-number">0'+number+'</span><h3>'+escape(c['practice'+number+'Title'])+'</h3><p class="service-summary">'+escape(c['practice'+number+'Body'])+'</p><span class="plus" aria-hidden="true"></span></summary><div class="service-detail"><p>'+escape(c['practice'+number+'Body'])+'</p><p>'+escape(c['practice'+number+'Output'])+'</p><a class="text-link" href="mailto:general@consultix.solutions?subject='+encodeURIComponent(c['practice'+number+'Title'])+'">'+escape(extra.serviceLink)+'<span class="arrow" aria-hidden="true"></span></a></div></details>';}).join('');
 const audienceRows=[['segmentstartup','startupHeading','startupHelp'],['segmentsaas','saasHeading','saasHelp'],['segmentsme','smeHeading','smeHelp']].map(keys=>'<article><p class="audience-type">'+escape(c[keys[0]])+'</p><div><h3>'+escape(c[keys[1]])+'</h3><p>'+escape(c[keys[2]])+'</p></div></article>').join('');
 const qualificationRows=['Microsoft','FPAC','HubSpot','Acumatica'].map(name=>'<div><dt>'+escape(c['credential'+name+'Title'])+'</dt><dd>'+escape(c['credential'+name+'Issuer'])+'</dd></div>').join('');
 const values={...c,...extra,lang:language,otherLanguagePath:language==='en'?'./de/index.html':'../index.html',serviceRows,audienceRows,qualificationRows};
 const markup=new Set(['heroHeading','serviceHeading','reviewHeading','supportHeading','serviceRows','audienceRows','qualificationRows']);
 let html=read('design-e/template.html').replace(/\{\{([a-zA-Z0-9]+)\}\}/g,(_,key)=>{if(values[key]===undefined)throw Error('Missing copy '+language+': '+key);return markup.has(key)?values[key]:escape(values[key]);});
 html=html.replace('<link rel="stylesheet" href="./style.css">',()=>'<style>'+css+'</style>').replace('<script src="./preview.js" defer></script>','').replace('href="../assets/favicon.svg"','href="'+data('assets/favicon.svg')+'"').replace('</body>',()=>'<script>'+read('design-e/preview.js')+'</script></body>');
 const directory=path.join(__dirname,'dist',language==='de'?'de':'');fs.mkdirSync(directory,{recursive:true});fs.writeFileSync(path.join(directory,'index.html'),html);console.log('Built E '+language+' mockup ('+Buffer.byteLength(html)+' bytes).');
}
fs.writeFileSync(path.join(__dirname,'dist','FONT-LICENSES.txt'),read('design-e/assets/instrument-serif-LICENSE')+'\n\n'+read('assets/dm-sans-LICENSE')+'\n\n'+read('assets/manrope-LICENSE'));
console.log('Design prototype only. Production files and Netlify are unchanged.');
