'use strict';
const fs=require('node:fs');
const path=require('node:path');
const test=require('node:test');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const production=read('index.html');
const alternative=read('design-v2/index.html');
const keys=html=>[...html.matchAll(/data-i="([^"]+)"/g)].map(match=>match[1]);

test('Version 2 preserves every existing copy key, enquiry topic and anchor target',()=>{
  for(const key of new Set(keys(production)))assert.ok(keys(alternative).includes(key),'Missing copy: '+key);
  for(const [,id]of production.matchAll(/\bid="([^"]+)"/g))assert.ok(alternative.includes('id="'+id+'"'),'Missing anchor: '+id);
  for(const [,topic]of production.matchAll(/data-engagement="([^"]+)"/g))assert.ok(alternative.includes('data-engagement="'+topic+'"'),'Missing topic: '+topic);
});

test('Version 2 keeps the original brand assets, shared functionality and genuine-proof boundary',()=>{
  assert.ok(alternative.includes('viewBox="0 0 42 64"'));
  for(const name of ['app','metrics','content'])assert.ok(alternative.includes('../'+name+'.js'));
  assert.match(alternative,/id="testimonials"[^>]*hidden/);
  assert.doesNotMatch(alternative,/id="forecast-demo"|id="founders"/);
  assert.match(alternative,/noindex,nofollow/);
});

test('both alternative language builds contain current copy without external local assets',()=>{
  const copy=require('../content.js');
  for(const language of ['en','de']){
    const html=read('design-v2/dist/'+(language==='de'?'de/':'')+'index.html');
    assert.ok(html.includes('<html lang="'+language+'">'));
    assert.ok(html.includes(copy[language].heroTitle));
    assert.doesNotMatch(html,/(?:href|src)="\.\.?\//);
    assert.ok(html.includes('data:font/woff2;base64,'));
    assert.ok(html.includes('data:image/svg+xml;base64,'));
    assert.ok(html.includes('https://consultix.solutions/'+(language==='de'?'de/':'')));
  }
});

test('the alternative is kept out of the production build and Netlify configuration',()=>{
  assert.doesNotMatch(read('build.js'),/design-v2/);
  assert.match(read('netlify.toml'),/command = "npm run build"/);
  assert.match(read('netlify.toml'),/publish = "dist"/);
  assert.doesNotMatch(production,/class="design-v2"/);
  assert.match(alternative,/class="design-v2"/);
});
