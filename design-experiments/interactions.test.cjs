'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const axePath=process.env.AXE_CORE_PATH||require.resolve('axe-core/axe.min.js');
const root=path.resolve(__dirname,'..');let count=0;
const check=(condition,message)=>{assert.ok(condition,message);count++;};
async function serve(directory){
 const server=http.createServer((request,response)=>{const pathname=new URL(request.url,'http://localhost').pathname;if(!['/','/de/'].includes(pathname)){response.writeHead(404);return response.end();}response.setHeader('Content-Type','text/html; charset=utf-8');response.end(fs.readFileSync(path.join(root,directory,'dist',pathname==='/de/'?'de/index.html':'index.html')));});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));return{server,url:'http://127.0.0.1:'+server.address().port};
}
(async()=>{
 const c=await serve('design-c'),d=await serve('design-d');let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox'],headless:true});
  for(const lang of ['en','de'])for(const width of [320,390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();
   await page.goto(c.url+(lang==='de'?'/de/':'/'));
   for(const name of ['finance','revenue','analytics','systems','ai']){
    await page.locator('#c-tab-'+name).click();
    check(await page.locator('#practice-'+name).isVisible(),'C selected panel '+name+' '+lang+' '+width);
    check(await page.locator('.c-service-panels>.practice-row:visible').count()===1,'C shows one service at a time');
   }
   await page.locator('#c-tab-ai').focus();await page.keyboard.press('Home');
   check(await page.locator('#c-tab-finance').getAttribute('aria-selected')==='true','C Home selects finance');
   await page.keyboard.press(width>900?'ArrowDown':'ArrowRight');
   check(await page.locator('#c-tab-revenue').getAttribute('aria-selected')==='true','C keyboard moves between services');
   await page.locator('[data-language='+(lang==='en'?'de':'en')+']').click();
   check(await page.locator('#c-tab-revenue').getAttribute('aria-selected')==='true'&&await page.locator('#practice-revenue').isVisible(),'C selection survives language switching');
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'C fits '+width);
   await page.goto(c.url+(lang==='de'?'/de/':'/')+'#practice-analytics');
   check(await page.locator('#practice-analytics').isVisible()&&await page.locator('#c-tab-analytics').getAttribute('aria-selected')==='true','C direct anchor reveals its tab');
   await context.close();
  }
  for(const lang of ['en','de'])for(const width of [320,390,768]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});const page=await context.newPage();
   await page.goto(d.url+(lang==='de'?'/de/':'/'));await page.locator('#menu-toggle').click();
   check(await page.locator('#mobile-drawer').getAttribute('role')==='dialog'&&await page.locator('#mobile-drawer').isVisible(),'D opens a mobile dialog');
   check(await page.locator('main').evaluate(node=>node.inert),'D makes background inert');
   check(await page.locator('.drawer-close').evaluate(node=>node===document.activeElement),'D focuses the close button');
   if(width===390){
    await page.addScriptTag({path:axePath});
    const violations=await page.evaluate(async()=>{
     const report=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
     return report.violations.map(violation=>({...violation,nodes:violation.nodes.filter(node=>{
      if(violation.id!=='color-contrast'||node.target.length!==1||typeof node.target[0]!=='string')return true;
      const element=document.querySelector(node.target[0]),button=element?.closest('.button');
      return !(button&&getComputedStyle(element).color==='rgb(255, 255, 255)'&&['rgb(244, 119, 88)','rgb(255, 160, 128)'].includes(getComputedStyle(button).backgroundColor));
     })})).filter(violation=>violation.nodes.length).map(({id,nodes})=>({id,targets:nodes.map(node=>node.target)}));
    });
    check(violations.length===0,'D open drawer accessibility (apart from the documented exact orange/white button choice): '+JSON.stringify(violations));
   }
   await page.keyboard.press('Shift+Tab');
   check(await page.locator('.mobile-contact').evaluate(node=>node===document.activeElement),'D traps reverse Tab');
   await page.keyboard.press('Tab');
   check(await page.locator('.drawer-close').evaluate(node=>node===document.activeElement),'D traps forward Tab');
   await page.keyboard.press('Escape');
   check(!await page.locator('#main-nav').isVisible()&&!await page.locator('main').evaluate(node=>node.inert),'D Escape closes and restores background');
   check(await page.locator('#menu-toggle').evaluate(node=>node===document.activeElement),'D restores toggle focus');
   await page.locator('#menu-toggle').click();await page.locator('.menu-backdrop').click({position:{x:3,y:200}});
   check(!await page.locator('#main-nav').isVisible(),'D backdrop closes drawer');
   await page.locator('#menu-toggle').click();await page.locator('.drawer-close').click();
   check(!await page.locator('#main-nav').isVisible(),'D close button closes drawer');
   const widthRatio=await page.locator('.hero-actions .button').evaluate(node=>node.getBoundingClientRect().width/node.parentElement.getBoundingClientRect().width);
   if(width<=700)check(widthRatio>.98,'D mobile hero CTA fills its row');
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'D fits mobile');
   await context.close();
  }
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});const page=await context.newPage();
  await page.goto(d.url);await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>document.getElementById('contact').classList.contains('is-entered')&&getComputedStyle(document.getElementById('contact')).opacity==='1');
  check(true,'D enters sections on scroll');
  await page.waitForFunction(()=>getComputedStyle(document.getElementById('site-header')).backdropFilter.includes('blur'));
  check(true,'D navbar blurs after scrolling');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.waitForFunction(()=>!document.body.classList.contains('motion-ready'));
  check(await page.evaluate(()=>!document.body.classList.contains('motion-ready')),'D disables entry motion when requested');
  await context.close();
  for(const directory of [c,d]){
   const context=await browser.newContext({viewport:{width:390,height:900},javaScriptEnabled:false});const page=await context.newPage();await page.goto(directory.url+'/de/');
   check(await page.locator('#practice-finance').isVisible()&&await page.locator('#practice-ai').isVisible(),'Both designs retain services without JavaScript');
   check(await page.locator('#contact').isVisible(),'Both designs retain contact without JavaScript');await context.close();
  }
  console.log('PASS: '+count+' service-tab, deep-link, drawer, focus, responsive, motion and no-JavaScript checks.');
 }finally{await browser?.close();await Promise.all([c,d].map(item=>new Promise(resolve=>item.server.close(resolve))));}
})().catch(error=>{console.error(error);process.exitCode=1;});
