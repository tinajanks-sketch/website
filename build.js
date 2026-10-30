'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {localise}=require('./localise.js');
const read=name=>fs.readFileSync(path.join(__dirname,name),'utf8');
const dataUrl=name=>{
  const mime={'.woff2':'font/woff2','.svg':'image/svg+xml'}[path.extname(name)];
  if(!mime)throw Error('Unsupported embedded asset: '+name);
  return 'data:'+mime+';base64,'+fs.readFileSync(path.join(__dirname,'assets',name)).toString('base64');
};
let html=read('index.html');
const stylesheet='<link rel="stylesheet" href="./style.css">';
const script='<script src="./app.js" defer></script>';
const metricsScript='<script src="./metrics.js" defer></script>';
const contentScript='<script src="./content.js" defer></script>';
if(!html.includes(stylesheet)||!html.includes(script)||!html.includes(metricsScript)||!html.includes(contentScript)||!html.includes('</body>'))throw Error('Expected stylesheet, script or body tag is missing.');
const css=read('style.css').replace(/url\(['"]\.\/assets\/([a-z0-9.-]+)['"]\)/g,(_,name)=>'url("'+dataUrl(name)+'")');
html=html.replace(stylesheet,()=>'<style>'+css+'</style>');
html=html.replace(script,'');
html=html.replace(metricsScript,'');
html=html.replace(contentScript,'');
html=html.replace('href="./assets/favicon.svg"',()=> 'href="'+dataUrl('favicon.svg')+'"');
if(process.env.SITE_INDEXABLE==='1')html=html.replace('content="noindex,nofollow"','content="index,follow"');
if(/(?:href|src)="\.\//.test(html)||/url\(['"]\.\/assets\//.test(html))throw Error('A local asset has not been embedded.');
const output=path.join(__dirname,'dist');
fs.mkdirSync(output,{recursive:true});
for(const language of ['en','de']){
  const directory=language==='de'?path.join(output,'de'):output;
  fs.mkdirSync(directory,{recursive:true});
  const page=localise(html,language).replace('</body>',()=>'<script>'+read('content.js')+'</script><script>'+read('metrics.js')+'</script><script>'+read('app.js')+'</script></body>');
  fs.writeFileSync(path.join(directory,'index.html'),page,'utf8');
  console.log('Built self-contained '+path.relative(__dirname,path.join(directory,'index.html'))+' ('+Buffer.byteLength(page)+' bytes).');
}
fs.writeFileSync(path.join(output,'FONT-LICENSES.txt'),read('assets/manrope-LICENSE')+'\n\n'+read('assets/dm-sans-LICENSE'),'utf8');
fs.writeFileSync(path.join(output,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n','utf8');
fs.writeFileSync(path.join(output,'_redirects'),'https://www.consultix.solutions/* https://consultix.solutions/:splat 301!\n','utf8');
console.log('Search indexing: '+(process.env.SITE_INDEXABLE==='1'?'enabled':'disabled for review')+'.');
