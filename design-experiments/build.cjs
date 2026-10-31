'use strict';
const fs=require('node:fs');const path=require('node:path');
const {localise}=require('../localise.js');
const letter=process.argv[2];if(!['c','d'].includes(letter))throw Error('Choose c or d');
const root=path.resolve(__dirname,'..'),directory='design-'+letter;
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const dataURL=name=>{const type={'.woff2':'font/woff2','.svg':'image/svg+xml'}[path.extname(name)];if(!type||!/^[a-z0-9.-]+$/.test(name))throw Error('Invalid asset');return'data:'+type+';base64,'+fs.readFileSync(path.join(root,'assets',name)).toString('base64');};
const css=text=>text.replace(/url\(['"](?:\.\/|\.\.\/)assets\/([a-z0-9.-]+)['"]\)/g,(_,name)=>'url("'+dataURL(name)+'")');
let html=read(directory+'/index.html');
html=html.replace('<link rel="stylesheet" href="../style.css">',()=>'<style>'+css(read('style.css'))+'</style>').replace('<link rel="stylesheet" href="./style.css">',()=>'<style>'+css(read(directory+'/style.css'))+'</style>');
for(const name of ['content','metrics','app'])html=html.replace('<script src="../'+name+'.js" defer></script>','');
html=html.replace('<script src="./interactions.js" defer></script>','').replace(/(href|src)="\.\.\/assets\/([a-z0-9.-]+)"/g,(_,attribute,name)=>attribute+'="'+dataURL(name)+'"');
if(/(?:href|src)="\.\.?\//.test(html))throw Error('Unbundled asset');
const output=path.join(root,directory,'dist');
for(const language of ['en','de']){const target=language==='de'?path.join(output,'de'):output;fs.mkdirSync(target,{recursive:true});const page=localise(html,language).replace('</body>',()=>['content','metrics','app'].map(name=>'<script>'+read(name+'.js')+'</script>').join('')+'<script>'+read(directory+'/interactions.js')+'</script></body>');fs.writeFileSync(path.join(target,'index.html'),page);console.log('Built '+letter.toUpperCase()+' '+language+' ('+Buffer.byteLength(page)+' bytes).');}
fs.writeFileSync(path.join(output,'FONT-LICENSES.txt'),read('assets/manrope-LICENSE')+'\n\n'+read('assets/dm-sans-LICENSE'));
console.log('Comparison only; production dist is untouched.');
