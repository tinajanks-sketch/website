'use strict';
// Comparison build only. This never writes to the production dist directory.
const fs = require('node:fs');
const path = require('node:path');
const {localise} = require('../localise.js');
const root = path.resolve(__dirname,'..');
const read = name => fs.readFileSync(path.join(root,name),'utf8');
const dataURL = name => {
  const type = {'.woff2':'font/woff2','.svg':'image/svg+xml'}[path.extname(name)];
  if (!type || !/^[a-z0-9.-]+$/.test(name)) throw Error('Unsupported asset '+name);
  return 'data:'+type+';base64,'+fs.readFileSync(path.join(root,'assets',name)).toString('base64');
};
const embedCSS = css => css.replace(/url\(['"](?:\.\/|\.\.\/)assets\/([a-z0-9.-]+)['"]\)/g,(_,name) => 'url("'+dataURL(name)+'")');
let html = read('design-v2/index.html');
html = html.replace('<link rel="stylesheet" href="../style.css">',() => '<style>'+embedCSS(read('style.css'))+'</style>');
html = html.replace('<link rel="stylesheet" href="./style.css">',() => '<style>'+embedCSS(read('design-v2/style.css'))+'</style>');
for (const script of ['content','metrics','app']) {
  const tag = new RegExp('<script src="\\.\\./'+script+'\\.js" defer>\\s*</script>');
  if (!tag.test(html)) throw Error('Missing shared script '+script);
  html = html.replace(tag,'');
}
html = html.replace(/(href|src)="\.\.\/assets\/([a-z0-9.-]+)"/g,(_,attribute,name) => attribute+'="'+dataURL(name)+'"');
if (/(?:href|src)="\.\.?\//.test(html)) throw Error('Unbundled local asset');
const output = path.join(__dirname,'dist');
for (const language of ['en','de']) {
  const directory = language === 'de' ? path.join(output,'de') : output;
  fs.mkdirSync(directory,{recursive:true});
  const page = localise(html,language).replace('</body>',() =>
    ['content','metrics','app'].map(script => '<script>'+read(script+'.js')+'</script>').join('')+'</body>');
  fs.writeFileSync(path.join(directory,'index.html'),page);
  console.log('Built Version 2 '+language+' ('+Buffer.byteLength(page)+' bytes).');
}
fs.writeFileSync(path.join(output,'FONT-LICENSES.txt'),read('assets/manrope-LICENSE')+'\n\n'+read('assets/dm-sans-LICENSE'));
console.log('Comparison build only. Production dist and Netlify settings are untouched.');
