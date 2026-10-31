'use strict';
// Exports comparison files only. It never writes to the production build.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const output=path.resolve(process.argv[2]||path.join(root,'design-experiments/dist'));
if(output===root||output===path.join(root,'dist'))throw Error('Choose a separate comparison output folder.');
const versions=[
 {key:'a',name:'Current editorial',directory:'dist',copy:'The current hierarchy, with distinct section colours and detail available when you need it.'},
 {key:'b',name:'Swiss architectural',directory:'design-v2/dist',copy:'A light split hero, asymmetric service panels and deep sage accents.'},
 {key:'c',name:'Services first',directory:'design-c/dist',copy:'A sticky service index, working service tabs and a horizontal qualifications rail.'},
 {key:'d',name:'Interaction polish',directory:'design-d/dist',copy:'The current layout with a blurred navigation bar, subtle motion and a mobile slide-out menu.'}
];
fs.mkdirSync(output,{recursive:true});
for(const version of versions){
 const source=path.join(root,version.directory);
 if(!fs.existsSync(path.join(source,'index.html')))throw Error('Build '+version.key.toUpperCase()+' first.');
 const target=path.join(output,version.key,'preview');
 fs.mkdirSync(path.join(target,'de'),{recursive:true});
 for(const file of ['index.html','de/index.html','FONT-LICENSES.txt']){
  if(fs.existsSync(path.join(source,file)))fs.copyFileSync(path.join(source,file),path.join(target,file));
 }
 fs.writeFileSync(path.join(target,'READ-ME.txt'),'Consultix Solutions — Version '+version.key.toUpperCase()+'\n\nOpen index.html for English or de/index.html for German. Each file contains its own assets. The language buttons also work when opened as local files. The contact form opens an email draft.\n\nB, C and D are comparison previews, not replacements for the live site. Only genuine approved feedback can be published.\n');
}
function picture(version){
 const desktop=path.join(output,version.key,'hero-en-1440.png');
 const mobile=path.join(output,version.key,'hero-en-390.png');
 const data=file=>'data:image/png;base64,'+fs.readFileSync(file).toString('base64');
 if(!fs.existsSync(desktop)||!fs.existsSync(mobile))return '<div class="fallback">Consultix<br><small>Version '+version.key.toUpperCase()+'</small></div>';
 return '<img class="preview-image" src="'+data(desktop)+'" data-mobile="'+data(mobile)+'" alt="Version '+version.key.toUpperCase()+': '+version.name+' desktop preview" width="1440" height="1000" loading="lazy">';
}
const cards=versions.map(version=>'<article><div class="version-heading"><span class="letter">'+version.key.toUpperCase()+'</span><h2>'+version.name+'</h2></div><div class="image-frame">'+picture(version)+'</div><p>'+version.copy+'</p><div class="preview-links"><a href="'+version.key+'/preview/index.html">Open English</a><a href="'+version.key+'/preview/de/index.html" lang="de">Deutsch</a></div></article>').join('');
const html=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Consultix — four design directions</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#F5F3EE;color:#1A2E38;font-family:Arial,Helvetica,sans-serif;line-height:1.6}a{color:inherit;text-underline-offset:4px}button{font:inherit}header,main,footer{width:min(1280px,calc(100% - 64px));margin:auto}header{padding:50px 0 35px;border-bottom:1px solid #BCC8CB}.brand{font-size:24px;letter-spacing:-1px}.intro{max-width:760px;margin:50px 0 30px}h1{font-size:clamp(34px,4.8vw,62px);line-height:1.08;font-weight:500;letter-spacing:-2px;margin:0 0 20px}.intro p{max-width:640px;font-size:18px;color:#4C6570}.controls{display:flex;gap:8px;margin:0 0 32px;align-items:center}.controls button{padding:10px 20px;background:transparent;border:1px solid #7B929C;border-radius:3px;cursor:pointer;color:#1A2E38}.controls button[aria-pressed=true]{background:#1A2E38;color:white;border-color:#1A2E38}button:focus-visible,a:focus-visible{outline:3px solid #42647A;outline-offset:4px}.versions{display:grid;grid-template-columns:1fr 1fr;gap:45px 38px;padding-bottom:60px}article{min-width:0}.version-heading{display:flex;align-items:center;gap:14px;margin-bottom:18px}.letter{display:grid;place-items:center;width:33px;height:33px;border:1px solid #7B929C;font-size:14px}h2{font-size:23px;letter-spacing:-.5px;font-weight:500;margin:0}.image-frame{background:#E3E8E7;border:1px solid #BCC8CB;overflow:hidden;aspect-ratio:1.44;display:flex;justify-content:center}.preview-image{display:block;width:100%;height:100%;object-fit:contain;object-position:top}body.mobile-preview .preview-image{width:auto;max-width:100%;height:100%}.fallback{font-size:52px;letter-spacing:-2px;align-self:center;line-height:1.1}.fallback small{font-size:20px;letter-spacing:0}article p{color:#4C6570;max-width:520px;margin:20px 0 16px}.preview-links{display:flex;flex-wrap:wrap;gap:22px}.preview-links a{font-weight:600;font-size:15px}.preview-links span{margin-left:6px}footer{border-top:1px solid #BCC8CB;padding:30px 0 50px;color:#4C6570;font-size:14px}footer p{max-width:850px}footer a{color:#1A2E38}
@media(max-width:720px){header,main,footer{width:calc(100% - 36px)}header{padding:28px 0 22px}.intro{margin-top:34px}h1{letter-spacing:-1px}.intro p{font-size:16px}.versions{grid-template-columns:1fr;gap:36px}h2{font-size:21px}.controls button{min-height:46px}.preview-links a{padding:7px 0}}
</style></head><body>
<header><div class="brand">Consultix Solutions</div></header>
<main><div class="intro"><h1>Four directions for Consultix.</h1><p>The same services and offers, arranged four ways. Compare the desktop and mobile views, then open a version to try its navigation and features.</p></div>
<div class="controls" role="group" aria-label="Screenshot size"><button type="button" data-view="desktop" aria-pressed="true">Desktop</button><button type="button" data-view="mobile" aria-pressed="false">Mobile</button></div>
<div class="versions">${cards}</div></main>
<footer><p>A is the current editorial direction. B, C and D are separate previews. The approved corrections to A were pushed to the production source; the final Netlify deployment could not be independently checked from this environment.</p><p>The original orange with white text is retained in A, C and D as requested. That colour pairing has a known text-contrast limitation. Qualification illustrations are not official issuer badges; testimonials stay hidden until approved quotations are available.</p><p><a href="https://consultix.solutions/">Visit consultix.solutions</a> · <a href="DESIGN-COMPARISON.md">Design and testing notes</a></p></footer>
<script>
document.querySelectorAll('.preview-image').forEach(image=>image.dataset.desktop=image.src);
document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{
 const mobile=button.dataset.view==='mobile';document.body.classList.toggle('mobile-preview',mobile);
 document.querySelectorAll('[data-view]').forEach(control=>control.setAttribute('aria-pressed',String(control===button)));
 document.querySelectorAll('.preview-image').forEach(image=>{image.src=image.dataset[mobile?'mobile':'desktop'];image.width=mobile?390:1440;image.height=mobile?844:1000;image.alt=image.alt.replace(/desktop preview|mobile preview/,(mobile?'mobile':'desktop')+' preview');});
}));
</script></body></html>`;
fs.writeFileSync(path.join(output,'index.html'),html);
fs.copyFileSync(path.join(root,'DESIGN-COMPARISON.md'),path.join(output,'DESIGN-COMPARISON.md'));
console.log('Comparison exported: '+path.join(output,'index.html'));
