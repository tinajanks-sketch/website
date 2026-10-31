'use strict';
const fs=require('node:fs'),path=require('node:path');
const test=require('node:test'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const production=read('index.html');
for(const directory of ['design-v2','design-c','design-d']){
 test(directory+' preserves copy, targets, offers and both built language pages',()=>{
  const html=read(directory+'/index.html');
  for(const [,key]of production.matchAll(/data-i="([^"]+)"/g))assert.ok(html.includes('data-i="'+key+'"'),'Missing copy key '+key);
  for(const [,id]of production.matchAll(/\bid="([^"]+)"/g))assert.ok(html.includes('id="'+id+'"'),'Missing target '+id);
  for(const [,topic]of production.matchAll(/data-engagement="([^"]+)"/g))assert.ok(html.includes('data-engagement="'+topic+'"'),'Missing enquiry '+topic);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate IDs');
  for(const language of ['en','de']){const built=read(directory+'/dist/'+(language==='de'?'de/':'')+'index.html');assert.ok(built.includes('<html lang="'+language+'">'));assert.ok(built.includes('Power BI Data Analyst Associates'));assert.ok(built.includes('Certified Corporate FP&amp;A Professionals (FPAC)'));assert.doesNotMatch(built,/(?:href|src)="\.\.?\//);}
 });
}
test('production remains isolated from comparison builds',()=>{
 assert.doesNotMatch(read('build.js'),/design-v2|design-c|design-d/);
 assert.match(read('netlify.toml'),/publish = "dist"/);
 assert.doesNotMatch(production,/design-c|design-d|mobile-drawer|c-service-tabs/);
});
