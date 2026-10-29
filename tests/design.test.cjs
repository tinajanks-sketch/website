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
});
test('hero typography is reduced and has responsive safeguards',()=>{
  assert.match(css,/\.hero h1\s*\{[^}]*font-size:clamp\(54px,6\.05vw,94px\)/);
  assert.match(css,/@media\(max-width:380px\)\s*\{[^}]*\.hero h1\s*\{font-size:clamp\(39px,11\.8vw,44px\)/);
  assert.match(css,/\.hero-description\s*\{[^}]*max-width:760px/);
  assert.match(css,/\.hero-illustration\s*\{[^}]*opacity:\.52/);
});
test('interactive visual styling and motion safeguards are preserved',()=>{
  for(const cls of ['.connected-lens','.forecast-demo','.metric-workspace','.choice-group','.enquiry-form']){
    assert.ok(css.includes(cls),'Missing '+cls);
  }
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /summary:focus-visible/);
  assert.match(html, /noindex,nofollow/);
  assert.match(html, /id="testimonials"[^>]*hidden/);
});
