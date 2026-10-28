'use strict';
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2'};
const assets=new Set(['architecture.svg','favicon.svg','manrope-latin-wght-normal.woff2','dm-sans-latin-wght-normal.woff2']);
http.createServer((request,response)=>{
  let pathname;
  try{pathname=new URL(request.url,'http://localhost').pathname;}catch{response.writeHead(400);return response.end('Bad request');}
  const file=pathname==='/'?'index.html':pathname.slice(1);
  if(!['index.html','style.css','forecast.js','app.js'].includes(file)&&!(file.startsWith('assets/')&&assets.has(file.slice(7)))){response.writeHead(404);return response.end('Not found');}
  if(!['GET','HEAD'].includes(request.method)){response.writeHead(405,{Allow:'GET, HEAD'});return response.end('Method not allowed');}
  fs.readFile(path.join(root,file),(error,data)=>{
    if(error){response.writeHead(500);return response.end('Unable to load page');}
    response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
    response.end(request.method==='HEAD'?undefined:data);
  });
}).listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Consultix Solutions development server listening on port '+(process.env.PORT||3000)));
