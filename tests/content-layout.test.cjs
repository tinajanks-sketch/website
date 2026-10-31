'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {en,de}=require('../content.js');
const {localise}=require('../localise.js');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const count=(source,needle)=>(source.match(needle)||[]).length;

test('headings are sized for reading rather than oversized or auto-hyphenated',()=>{
  assert.match(css,/h1,h2,h3,h4\s*\{[^}]*hyphens:none/);
  assert.match(css,/h2\s*\{[^}]*font-size:clamp\(32px,3\.15vw,50px\)/);
  assert.match(css,/\.hero h1\s*\{[^}]*font-size:clamp\(48px,5\.0vw,76px\)/);
  assert.match(css, /\.hero h1\{font-size:clamp\(34px,9\.2vw,37px\)/);
});

test('five practices show concise copy with full optional detail',()=>{
  const rows=[...html.matchAll(/<article class="practice-row"[\s\S]*?<\/article>/g)];
  assert.equal(rows.length,5);
  for(const [i,row] of rows.entries()){
    assert.match(row[0],new RegExp('data-i="practice'+(i+1)+'Body"'));
    assert.match(row[0],/<details class="practice-details" name="consultix-practice">/);
    assert.match(row[0],/<summary data-i="practiceDetailsLabel">/);
    assert.doesNotMatch(row[0],/href="#contact"|data-engagement=/,'Service information does not repeat an enquiry CTA');
    assert.match(row[0],new RegExp('data-i="practice'+(i+1)+'Output"'));
  }
});

test('detailed financial and example material remains available on demand',()=>{
  assert.match(html,/<details class="finance-services-disclosure">/);
  assert.match(html,/<details class="example-disclosure">/);
  assert.match(html,/<details class="values-disclosure">/);
  assert.equal(count(html,/<details class="offer-details">/g),5);
  assert.doesNotMatch(html,/id="forecast-demo"|id="forecast-table"|id="forecast-download"|src="\.\/forecast\.js"/);
  assert.match(html,/id="metric-explorer"/);
  assert.match(html,/id="performance-lens"/);
  assert.match(html,/id="revenue-finance"/);
});

test('English and German use short headings before JavaScript',()=>{
  const enPage=localise(html,'en');
  const dePage=localise(html,'de');
  assert.match(enPage,/Our five practices\./);
  assert.match(dePage,/Unsere fünf Leistungsbereiche\./);
  assert.match(enPage,/Scope and deliverables/);
  assert.match(dePage,/Leistungen und Ergebnisse/);
  assert.match(enPage,/Ways to work with Consultix\./);
  assert.match(dePage,/So können Sie mit Consultix arbeiten\./);
  const ids=[...html.matchAll(/data-i="([^"]+)"/g)].map(x=>x[1]);
  for(const key of ids){
    assert.equal(typeof en[key],'string','English missing: '+key);
    assert.equal(typeof de[key],'string','German missing: '+key);
  }
});

test('privacy and established identity are preserved',()=>{
  assert.match(html,/noindex,nofollow/);
  assert.match(html,/id="testimonials"[^>]*hidden/);
  assert.match(html,/<svg class="brand-mark" viewBox="0 0 42 64"/);
  assert.match(css,/--cta-coral:#F47758/);
  assert.match(html,/general@consultix\.solutions/);
});
