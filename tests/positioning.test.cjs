'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {en,de} = require('../content.js');
const {localise} = require('../localise.js');
const root = path.resolve(__dirname,'..');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const css = fs.readFileSync(path.join(root,'style.css'),'utf8');
const practices = [
  'Financial Planning & Management Reporting',
  'Revenue Operations Management & CRM',
  'Business Intelligence & Data Analytics',
  'Revenue-to-Finance Alignment',
  'AI Enablement & Automation'
];

test('the five practices appear in the agreed order',()=>{
  const keys = [...html.matchAll(/<article class="practice-row"[^>]*>[\s\S]*?<h3 data-i="(practice\dTitle)"/g)].map(m=>m[1]);
  assert.deepEqual(keys,['practice1Title','practice2Title','practice3Title','practice4Title','practice5Title']);
  assert.deepEqual(keys.map(k=>en[k]),practices);
});
test('the offer cards follow the same commercial sequence',()=>{
  const keys = [...html.matchAll(/<article class="engagement-card"[^>]*>[\s\S]*?<h4 data-i="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(keys,['planningTitle','crmOfferTitle','analyticsTitle','workflowTitle','automationOfferTitle']);
});
test('the template only uses known translations in both languages',()=>{
  const keys = [...html.matchAll(/data-i="([^"]+)"/g)].map(m=>m[1]);
  for(const key of keys){
    assert.equal(typeof en[key],'string','Missing English: '+key);
    assert.equal(typeof de[key],'string','Missing German: '+key);
  }
});
test('the connection lens works without external scripts',()=>{
  assert.match(html, /id="performance-lens"/);
  assert.equal((html.match(/<details class="lens-card"/g)||[]).length,3);
  assert.match(html, /<details class="lens-card" name="consultix-perspective" open>/);
  assert.match(css,/\.lens-card summary:focus-visible/);
  assert.match(css, /prefers-reduced-motion:reduce/);
});
test('English and German are server-renderable before client JavaScript',()=>{
  const enPage=localise(html,'en'),dePage=localise(html,'de');
  assert.match(enPage,/<html lang="en">/);
  assert.match(dePage,/<html lang="de">/);
  assert.match(enPage,/Look beyond a single dashboard/);
  assert.match(dePage,/Blicken Sie über einzelne Dashboards hinaus/);
  assert.match(dePage,/Finanzplanung &amp; Management-Reporting/);
});
test('privacy and testimonial safeguards remain intact',()=>{
  const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
  assert.match(html,/noindex,nofollow/);
  assert.match(html,/id="testimonials"[^>]*hidden/);
  assert.match(app,/const approvedTestimonials = \[\];/);
  assert.match(html,/general@consultix\.solutions/);
});
