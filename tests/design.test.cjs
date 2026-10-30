'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const token=name=>css.match(new RegExp('--'+name+':(#[0-9a-fA-F]{6})'))?.[1]?.toUpperCase();
const luminance=hex=>{
  const rgb=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)
    .map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
};
const contrast=(a,b)=>{
  const [hi,lo]=[luminance(a),luminance(b)].sort((x,y)=>y-x);
  return (hi+.05)/(lo+.05);
};
test('design tokens reflect the selected site-wide palette',()=>{
  assert.equal(token('ink'),'#1B2D37');
  assert.equal(token('ivory'),'#F7F5F0');
  assert.equal(token('coral'),'#AC5A42');
  assert.equal(token('mineral'),'#42647A');
  assert.equal(token('surface-mist'),'#E6EDED');
  assert.match(html, /name="theme-color" content="#1B2D37"/);
});
test('principal text and CTA combinations meet 4.5:1 minimum contrast',()=>{
  assert.ok(contrast('#1B2D37','#F7F5F0')>=4.5);
  assert.ok(contrast('#536873','#F7F5F0')>=4.5);
  assert.ok(contrast('#FFFFFF','#AC5A42')>=4.5);
  assert.ok(contrast('#E9A894','#1B2D37')>=4.5);
  assert.ok(contrast('#1B2D37','#F47758')>=4.5);
});
test('primary buttons regain the brighter coral identity without losing contrast',()=>{
  assert.match(css,/--cta-coral:#F47758/);
  assert.match(css,/--cta-coral-hover:#FFA080/);
  assert.match(css,/\.button\s*\{[^}]*background:var\(--cta-coral\)/);
  assert.match(css,/\.hero-actions \.button::after\s*\{/);
  assert.doesNotMatch(css,/\.site-header:not\(\.is-scrolled\):not\(\.menu-open\) \.brand-mark/);
});
test('hero typography is reduced and has responsive safeguards',()=>{
  assert.match(css,/\.hero h1\s*\{[^}]*font-size:clamp\(49px,5\.2vw,80px\)/);
  assert.match(css,/@media\(max-width:380px\)\s*\{[^}]*\.hero h1\s*\{font-size:clamp\(35px,10vw,39px\)/);
  assert.match(css,/\.hero-description\s*\{[^}]*max-width:760px/);
  assert.match(css,/\.hero-illustration\s*\{[^}]*opacity:\.52/);
});
test('interactive visual styling and motion safeguards are preserved',()=>{
  for(const cls of ['.connected-lens','.strategic-finance','.metric-workspace','.choice-group','.enquiry-form']){
    assert.ok(css.includes(cls),'Missing '+cls);
  }
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /summary:focus-visible/);
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /id="testimonials"[^>]*hidden/);
});

test('the original brand mark and favicon remain unchanged',()=>{
  const favicon=fs.readFileSync(path.join(root,'assets/favicon.svg'),'utf8').trim();
  assert.match(html, /<svg class="brand-mark" viewBox="0 0 42 64"/);
  assert.equal(favicon,'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#181B1D"/><path d="m21 29 24-22M21 35l24 22" fill="none" stroke="#F47758" stroke-width="3"/><circle cx="17" cy="32" r="4" fill="none" stroke="#F47758" stroke-width="3"/></svg>');
});
