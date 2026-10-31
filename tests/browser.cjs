'use strict';
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const axePath=process.env.AXE_CORE_PATH||require.resolve('axe-core/axe.min.js');
const root=path.resolve(__dirname,'..');
let checks=0;
const check=(condition,message)=>{assert.ok(condition,message);checks++;};
const chosenButtonContrast=new Set();
async function scanAccessibility(page,selector=null){
 const result=await page.evaluate(async selector=>{
  const report=await axe.run(selector?document.querySelector(selector):document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
  const accepted=[];
  // Keep scanning every element/rule. Only the exact owner-selected white-on-
  // orange button text is an exception; unrelated contrast failures still fail.
  report.violations=report.violations.map(violation=>{
   if(violation.id!=='color-contrast')return violation;
   const nodes=violation.nodes.filter(node=>{
    let element;
    try{if(node.target.length===1&&typeof node.target[0]==='string')element=document.querySelector(node.target[0]);}catch{}
    const button=element?.closest('.button');
    const foreground=element&&getComputedStyle(element).color;
    const background=button&&getComputedStyle(button).backgroundColor;
    const expected=button&&foreground==='rgb(255, 255, 255)'&&['rgb(244, 119, 88)','rgb(255, 160, 128)'].includes(background);
    if(expected)accepted.push(node.target.join(' ')+' / '+background);
    return !expected;
   });
   return {...violation,nodes};
  }).filter(violation=>violation.nodes.length);
  return {violations:report.violations,accepted};
 },selector);
 result.accepted.forEach(target=>chosenButtonContrast.add(target));
 return result;
}
(async()=>{
 const buildRoot=path.resolve(root,process.env.CONSULTIX_BUILD_DIR||'dist');
 const html=fs.readFileSync(path.join(buildRoot,'index.html'),'utf8');
 const germanHTML=fs.readFileSync(path.join(buildRoot,'de/index.html'),'utf8');
 const server=http.createServer((request,response)=>{const pathname=new URL(request.url,'http://localhost').pathname;if(!['/','/index.html','/de/'].includes(pathname)){response.writeHead(404);return response.end();}response.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});response.end(pathname==='/de/'?germanHTML:html);});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin='http://127.0.0.1:'+server.address().port;
 let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[],externalRequests=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('request',request=>{if(/^https?:/.test(request.url())&&!request.url().startsWith(origin+'/'))externalRequests.push(request.url());});
  await page.goto(origin);
  await page.evaluate(()=>document.fonts.ready);
  check((await page.locator('h1').innerText())===require('../content.js').en.heroTitle,'English homepage renders the current headline');
  check(await page.locator('.practice-row').count()===5,'Five connected service practices');
  check(await page.locator('#qualifications .credential').count()===4,'The four owner-supplied qualification descriptions appear');
  check(await page.locator('[data-i=credentialHubSpotTitle]').innerText()==='HubSpot certified'&&await page.locator('[data-i=credentialAcumaticaTitle]').innerText()==='Acumatica certified','Credential labels use the requested wording');
  check((await page.locator('#qualifications').innerText()).includes('Power BI Data Analyst Associates')&&(await page.locator('#qualifications').innerText()).includes('Certified Corporate FP&A Professionals (FPAC)'),'Credential captions match the owner-requested display labels');
  check(!/partner|certified firm|platinum|gold|silver/i.test(await page.locator('#qualifications').innerText()),'Qualification descriptions do not invent company partner status or certification levels');
  check(await page.locator('.engagement-card').count()===5,'Five focused project offers');
  check(await page.locator('link[rel=canonical]').getAttribute('href')==='https://consultix.solutions/','Selected domain');
  check(await page.evaluate(()=>document.fonts.check('500 16px Manrope')&&document.fonts.check('400 16px "DM Sans"')),'Embedded fonts load');
  check(!await page.locator('#site-header').evaluate(el=>el.classList.contains('is-scrolled')),'Header starts over hero');
  const screenshotDirectory=process.env.CONSULTIX_SCREENSHOTS;
  if(screenshotDirectory){fs.mkdirSync(screenshotDirectory,{recursive:true});await page.screenshot({path:path.join(screenshotDirectory,'consultix-hero.png')});await page.screenshot({path:path.join(screenshotDirectory,'consultix-full.png'),fullPage:true});}

  const serviceTabs=await page.locator('[data-c-tabs]').count();
  if(serviceTabs)await page.locator('#c-tab-analytics').click();
  check((await page.locator('#practice-analytics h3').innerText()).includes('Data Analytics'),'Data analytics has a dedicated practice');
  if(serviceTabs)await page.locator('#c-tab-systems').click();
  check((await page.locator('#practice-systems h3').innerText()).includes('Revenue-to-Finance'),'Revenue-to-Finance has a dedicated practice');
  if(serviceTabs)await page.locator('#c-tab-finance').click();
  check(await page.locator('.review-offer').count()===1&&await page.locator('.ongoing-offer').count()===1,'Paid review and ongoing support are distinct offers');
  check(await page.locator('#review-title').innerText()==='Business Performance & Planning Review','A general business review is available');
  check(await page.locator('#founders,.founder-card,[data-i=cofounder]').count()===0,'The co-founder section is removed');
  check(!await page.locator('#testimonials').isVisible()&&await page.locator('.testimonial-card').count()===0,'Unsupplied testimonials stay hidden');
  check((await page.locator('#example-engagements').innerText()).includes('not completed client projects'),'Example scopes are distinguished from client case studies');
  check(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(link=>document.getElementById(link.getAttribute('href').slice(1)))),'All internal links point to existing sections');
  check(!await page.locator('.resource-library').evaluate(node=>node.open),'Detailed guides start collapsed');
  check(await page.locator('#business-guide').isVisible()&&!await page.locator('#business-guide').evaluate(node=>Boolean(node.closest('.resource-library'))),'Business-type support is visible outside the optional guides');
  check(await page.locator('#qualifications').evaluate(node=>node.previousElementSibling.id==='example-engagements'),'Qualifications appear toward the end of the page');
  check(await page.locator('#who-we-help').evaluate(node=>getComputedStyle(node).backgroundColor)!==await page.locator('#practices').evaluate(node=>getComputedStyle(node).backgroundColor),'Audience and services have distinct background colours');
  check(await page.locator('#business-guide').evaluate(node=>getComputedStyle(node).backgroundColor)!==await page.locator('#practices').evaluate(node=>getComputedStyle(node).backgroundColor),'The business-type guide has its own background');
  await page.locator('#credential-track').scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.querySelectorAll('.credential-art img')].every(img=>img.complete&&img.naturalWidth>0));
  check(await page.locator('.credential-art img').count()===4,'Four qualification illustrations load in the standalone build');
  check(await page.locator('#credential-previous').isDisabled()&&!await page.locator('#credential-next').isDisabled(),'The image carousel starts at its first position');
  await page.locator('#credential-next').click();
  await page.waitForFunction(()=>document.getElementById('credential-track').scrollLeft>20&&!document.getElementById('credential-previous').disabled);
  check(!await page.locator('#credential-previous').isDisabled(),'Carousel next advances the image rail');
  await page.locator('#credential-track').focus();await page.keyboard.press('End');
  await page.waitForFunction(()=>document.getElementById('credential-next').disabled);
  check((await page.locator('#credential-position').innerText()).includes('4 of 4'),'End reveals the last qualification and updates the visible range');
  await page.locator('[data-language=de]').click();
  check((await page.locator('#credential-position').innerText()).includes('von 4')&&await page.locator('#credential-next').isDisabled(),'Carousel position survives language switching and its status is translated');
  await page.locator('[data-language=en]').click();
  await page.locator('#credential-track').focus();await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.getElementById('credential-previous').disabled);
  check(!await page.locator('#credential-next').isDisabled(),'Home returns to the beginning of the carousel');
  await page.locator('#practice-finance .practice-details>summary').click();
  await page.locator('#practice-finance a[href="#strategic-finance"]').click();
  check(await page.locator('.resource-library').evaluate(node=>node.open)&&await page.locator('#finance-title').isVisible(),'Service deep links reveal the detailed guides');
  await page.locator('.resource-library>summary').focus();await page.keyboard.press('Enter');
  check(!await page.locator('#challenge-finder').isVisible(),'The detailed guides collapse with the keyboard');
  await page.keyboard.press('Enter');
  check(await page.locator('#challenge-finder').isVisible(),'The detailed guides reopen with the keyboard');
  await page.locator('#challenge-finder [data-choice=analytics]').click();
  check(await page.locator('#finder-analytics').isVisible()&&!await page.locator('#finder-finance').isVisible(),'Challenge finder shows the selected recommendation');
  await page.locator('#finder-analytics [data-engagement=review]').click();
  check(await page.locator('#interest').inputValue()==='review','Challenge recommendation selects the review enquiry');
  await page.locator('#alignment-flow [data-choice=billing]').focus();await page.keyboard.press('Enter');
  check(await page.locator('#flow-billing').isVisible()&&!await page.locator('#flow-pipeline').isVisible(),'Connected-information visual works with the keyboard');
  await page.locator('.review-offer [data-engagement=review]').click();
  check(await page.locator('#interest').inputValue()==='review','General review CTA selects the matching offer');
  for(const topic of ['planning','analytics','workflow']){
   await page.locator('.engagement-card [data-engagement='+topic+']').click();
   check(await page.locator('#interest').inputValue()===topic,'Project enquiry routes correctly: '+topic);
  }
  check(JSON.stringify(await page.locator('.practice-row h3').allTextContents())===JSON.stringify(['Financial Planning & Management Reporting','Revenue Operations Management & CRM','Business Intelligence & Data Analytics','Revenue-to-Finance Alignment','AI Enablement & Automation']),'Five practices follow the new boundaries and order');
  check(await page.locator('#practice-systems a[href="#revenue-finance"]').count()===1&&await page.locator('#practice-revenue a[href="#crm-offer"]').count()===1,'RevOps and Revenue-to-Finance have distinct onward links');
  check(await page.evaluate(()=>translatedElements.every(node=>typeof german[node.dataset.i]==='string'&&german[node.dataset.i].trim())),'Every English content key has a German translation');
  for(const segment of ['startup','saas','sme']){
   await page.locator('#business-guide [data-choice='+segment+']').focus();await page.keyboard.press('Enter');
   check(await page.locator('#segment-'+segment).isVisible(),'Audience guide works with the keyboard: '+segment);
   check(await page.locator('#segment-'+segment+' .segment-columns>div:first-child li').count()===3,'Each segment describes three representative questions: '+segment);
  }
  await page.locator('#segment-sme [data-engagement=review]').click();
  check(await page.locator('#interest').inputValue()==='review','Audience guide routes to a relevant enquiry');
  for(const topic of ['crm','automation']){
   await page.locator('#'+topic+'-offer [data-engagement='+topic+']').click();
   check(await page.locator('#interest').inputValue()===topic,'New offer routes correctly: '+topic);
  }
  check(!await page.locator('#metric-explorer .metric-workspace').isVisible(),'Optional KPI examples start collapsed');
  await page.locator('.metric-disclosure>summary').focus();await page.keyboard.press('Enter');
  check(await page.locator('#metric-explorer .metric-workspace').isVisible(),'KPI examples open with the keyboard');
  check(await page.locator('#metric-value').innerText()==='60.0%','Gross-margin example is financially correct');
  await page.locator('#metric-delivery').fill('150000');
  check(await page.locator('#metric-value').innerText()==='-25.0%','Metric explorer handles negative margins');
  await page.locator('#metric-revenue').fill('0');
  check((await page.locator('#metric-error').innerText()).includes('undefined')&&await page.locator('#metric-value').innerText()==='—','Zero revenue does not show a fabricated margin');
  await page.locator('#metric-reset').click();
  await page.locator('[data-metric=retention]').focus();await page.keyboard.press('Enter');
  check(await page.locator('#metric-value').innerText()==='104.0%','Recurring-revenue retention uses the opening cohort');
  check((await page.locator('#metric-definition').innerText()).includes('new customers are excluded'),'Retention assumptions exclude new customers');
  await page.locator('#metric-churn').fill('50000');
  check((await page.locator('#metric-error').innerText()).includes('cannot exceed'),'Inconsistent cohort losses are explained');
  await page.locator('#metric-reset').click();
  await page.locator('[data-metric=runway]').click();
  check(await page.locator('#metric-value').innerText()==='6.0 months','Runway uses positive net cash burn');
  await page.locator('#metric-receipts').fill('75000');
  check((await page.locator('#metric-error').innerText()).includes('No positive net cash burn')&&!await page.locator('.metric-bars').isVisible(),'Zero burn shows an explanation, not infinite runway');
  await page.locator('#metric-receipts').fill('');
  check((await page.locator('#metric-error').innerText()).includes('Enter a value'),'Empty values are not silently treated as zero');
  await page.locator('#metric-reset').click();
  check(await page.locator('#forecast-demo,#forecast-chart,#forecast-download').count()===0,'Removed forecast controls do not return after using the metric explorer');
  await page.evaluate(()=>{
   const common={approved:true,predatesConsultix:false,context:{en:'Test fixture only',de:'Nur Testdaten'},source:{label:{en:'Test source',de:'Testquelle'},url:'javascript:alert(1)'}};
   approvedTestimonials.push(
    null,{...common,approved:false,name:'Unapproved test',quote:{en:'Not approved',de:'Nicht freigegeben'}},
    {...common,name:'Test A.',quote:{en:'<img src=x onerror=alert(1)> Test fixture',de:'Testdaten ohne Bild'}},
    {...common,name:'Test B.',predatesConsultix:true,rating:2,quote:{en:'A supplied test rating',de:'Eine angegebene Testbewertung'}}
   );
   renderApprovedTestimonials(approvedTestimonials,'en');
  });
  check(await page.locator('.testimonial-card').count()===2&&await page.locator('.testimonial-card:visible').count()===1,'Only approved complete feedback renders, one slide at a time');
  check(await page.locator('.testimonial-card img').count()===0&&await page.locator('.testimonial-card a').count()===0,'Feedback is text-safe and unsafe source links are rejected');
  check(await page.locator('.testimonial-rating').count()===1&&(await page.locator('.testimonial-rating').getAttribute('aria-label')).startsWith('2 '),'Ratings are optional and use the supplied score');
  check(await page.locator('#testimonial-previous').isDisabled()&&!await page.locator('#testimonial-next').isDisabled(),'Carousel disables the previous control at the first quote');
  await page.locator('.testimonial-carousel').focus();await page.keyboard.press('ArrowRight');
  check(await page.locator('#testimonial-next').isDisabled()&&(await page.locator('#testimonial-position').innerText())==='2 of 2','Keyboard advances the carousel and stops at the last quote');
  check((await page.locator('.testimonial-card:visible .testimonial-origin').innerText()).includes('before Consultix'),'Earlier work is explicitly identified');
  await page.locator('[data-language=de]').click();
  check(new URL(page.url()).pathname==='/de/'&&await page.locator('link[rel=canonical]').getAttribute('href')==='https://consultix.solutions/de/','German selection has a direct address and canonical URL');
  check(await page.locator('#testimonial-position').innerText()==='2 von 2'&&(await page.locator('.testimonial-card:visible blockquote').innerText())==='Eine angegebene Testbewertung','Carousel selection is preserved with translated text');
  check(await page.locator('#metric-value').innerText()==='6,0 Monate'&&await page.locator('#business-guide [data-choice=sme]').getAttribute('aria-pressed')==='true','Metric and segment selections survive language switching');
  check(await page.locator('.metric-disclosure').evaluate(node=>node.open),'Language changes preserve the open KPI disclosure');
  await page.locator('.testimonial-carousel').focus();await page.keyboard.press('Home');
  check(await page.locator('#testimonial-previous').isDisabled(),'Home returns to the first quotation');
  await page.keyboard.press('End');
  check(await page.locator('#testimonial-next').isDisabled(),'End moves to the last quotation');
  await page.addScriptTag({path:axePath});
  const testimonialAccessibility=await scanAccessibility(page,'#testimonials');
  check(testimonialAccessibility.violations.length===0,'Active carousel accessibility: '+JSON.stringify(testimonialAccessibility.violations.map(v=>v.id)));
  await page.evaluate(()=>{approvedTestimonials.length=0;renderApprovedTestimonials(approvedTestimonials,'de');});
  await page.locator('[data-language=en]').click();
  check(!await page.locator('#testimonials').isVisible(),'Zero approved testimonials hide the entire section');
  check(await page.locator('#about').evaluate(node=>node.nextElementSibling.id==='example-engagements'),'Removing the founders leaves no empty section between About and examples');
  if(screenshotDirectory){
   await page.evaluate(()=>{
    const preview={approved:true,predatesConsultix:false,name:'Attribution placeholder',
     quote:{en:'Layout preview only. A genuine, approved client quotation will appear here. This is not customer feedback.',de:'Nur eine Gestaltungsvorschau. Hier wird ein echtes, freigegebenes Kundenzitat stehen. Dies ist keine Kundenbewertung.'},
     context:{en:'Design placeholder — not a client endorsement',de:'Gestaltungsplatzhalter — keine Kundenempfehlung'},
     source:{label:{en:'Preview content only',de:'Nur Vorschauinhalt'}}};
    renderApprovedTestimonials([preview,{...preview,name:'Second attribution placeholder'}],'en');
    document.getElementById('testimonials-title').textContent='Testimonial layout preview';
    document.querySelector('[data-i=testimonialsEyebrow]').textContent='DESIGN PREVIEW · PLACEHOLDER TEXT';
    document.querySelector('[data-i=testimonialsDescription]').textContent='This preview uses labelled placeholders. No client feedback has been published.';
   });
   await page.locator('#testimonials').screenshot({path:path.join(screenshotDirectory,'consultix-testimonial-layout-preview.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   await page.evaluate(()=>{renderApprovedTestimonials([],'en');setLanguage('en');});
   check(!await page.locator('#testimonials').isVisible(),'Testimonial layout placeholders are removed after the screenshot');
  }

  check(await page.locator('#forecast-demo,#forecast-chart,#forecast-table,#forecast-download,.finance-noscript').count()===0,'The complete rolling P&L example and its fallback are removed');
  check(await page.evaluate(()=>typeof window.ConsultixForecast==='undefined'),'The removed forecasting script is not loaded');
  check(await page.locator('meta[name=robots]').getAttribute('content')==='noindex,nofollow','Review indexing setting is preserved');
  check(await page.locator('#strategic-finance').isVisible(),'Financial planning services remain available');
  await page.locator('.finance-services-disclosure>summary').focus();await page.keyboard.press('Enter');
  check(await page.locator('.finance-services').isVisible(),'Planning and reporting details open with the keyboard');
  await page.keyboard.press('Enter');
  check(!await page.locator('.finance-services').isVisible(),'Planning details can be collapsed');
  const sectionColours=await page.evaluate(()=>['revenue-finance','strategic-finance','about'].map(id=>getComputedStyle(document.getElementById(id)).backgroundColor));
  check(new Set(sectionColours).size===3,'Strategic finance, financial planning and About have distinct backgrounds');
  await page.locator('.values-disclosure>summary').click();
  check(await page.locator('#about .values').isVisible(),'About principles expand on the updated background');
  if(screenshotDirectory){
   await page.locator('#about').screenshot({path:path.join(screenshotDirectory,'consultix-about.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   await page.locator('#strategic-finance').screenshot({path:path.join(screenshotDirectory,'consultix-finance-without-forecast.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   for(const [selector,name] of [['#qualifications','qualifications'],['#practices','practices'],['#challenge-finder','challenge-finder'],['#engagements','offers'],['#revenue-finance','alignment'],['#performance-lens','performance-lens'],['#business-guide','segments'],['#metric-explorer','metrics']]){
    await page.locator(selector).screenshot({path:path.join(screenshotDirectory,'consultix-'+name+'.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   }
  }

  for(const language of ['de','en']){
   await page.locator('[data-language='+language+']').click();
   check(await page.locator('html').getAttribute('lang')===language,'Document language '+language);
   check(!(await page.locator('body').innerText()).includes('undefined'),'Complete translations '+language);
   check(!/Kristina|Aleksandar|Co-founder|Meet the people behind Consultix|Die Menschen hinter Consultix/.test(await page.locator('body').innerText()),'No co-founder content remains in '+language);
   for(const width of [320,390,768,1024,1440,1920]){
    await page.setViewportSize({width,height:1000});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow at '+width+' in '+language);
   }
   await page.addScriptTag({path:axePath});
   const accessibility=await scanAccessibility(page);
   check(accessibility.violations.length===0,'Accessibility '+language+': '+JSON.stringify(accessibility.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('.engagement-card [data-engagement=workflow]').click();
  check(await page.locator('#interest').inputValue()==='workflow','Offer link selects enquiry topic');
  check(await page.locator('#site-header').evaluate(el=>el.classList.contains('is-scrolled')),'Header readable over light sections');
  await page.locator('#copy-email').click();
  check(await page.evaluate(()=>navigator.clipboard.readText())==='general@consultix.solutions','Copy email works');
  context.on('page',popup=>{popup.on('pageerror',()=>{});});
  await page.locator('#enquiry-form button[type=submit]').click();
  check(!await page.locator('#email-draft-link').isVisible(),'Empty form does not prepare mail');
  await page.locator('#name').fill('Example & Team');await page.locator('#email').fill('not-an-email');await page.locator('#message').fill('Planning & CRM: forecasts + handoffs.');
  await page.locator('#enquiry-form button[type=submit]').click();
  check(!await page.locator('#email-draft-link').isVisible(),'Invalid email does not prepare mail');
  await page.locator('#email').fill('example@example.com');await page.locator('#company').fill('Example GmbH');
  await page.locator('#enquiry-form button[type=submit]').click();
  await page.waitForFunction(()=>document.getElementById('form-status').textContent.length>0);
  check(await page.locator('#email-draft-link').isVisible(),'Valid form prepares a reusable email draft');
  check(await page.locator('#email-draft-link').getAttribute('target')==='_blank','Opening draft preserves website tab');
  const mail=new URL(await page.locator('#email-draft-link').getAttribute('href'));
  check(mail.pathname==='general@consultix.solutions','Draft recipient');
  check(mail.searchParams.get('subject').includes('Revenue-to-Finance Alignment'),'Selected subject encoded');
  check(mail.searchParams.get('body').includes('Example & Team')&&mail.searchParams.get('body').includes('forecasts + handoffs.'),'User text encoded intact');
  check((await page.locator('#form-status').innerText()).includes('Complete sending in your email app'),'No false delivery confirmation');
  await page.locator('[data-language=de]').click();
  check(await page.locator('#name').inputValue()==='Example & Team','Language switch preserves enquiry');
  await page.reload();
  check(await page.locator('html').getAttribute('lang')==='de','Language preference persists');
  check(await page.locator('.metric-disclosure').evaluate(node=>!node.open),'KPI examples return to the compact state after reloading');
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));
  check(!await page.locator('#main-nav').isVisible(),'Mobile menu starts collapsed');
  await page.locator('#menu-toggle').click();
  check(await page.locator('#main-nav').isVisible(),'Mobile menu opens');
  await page.keyboard.press('Escape');
  check(!await page.locator('#main-nav').isVisible(),'Escape closes mobile menu');
  check(await page.locator('#menu-toggle').evaluate(el=>el===document.activeElement),'Escape restores focus');
  await page.locator('#menu-toggle').click();await page.locator('#main-nav a[href="#engagements"]').click();
  check(!await page.locator('#main-nav').isVisible(),'Navigation closes mobile menu');
  await page.locator('[data-language=en]').click();await page.evaluate(()=>scrollTo(0,0));
  await page.addScriptTag({path:axePath});
  const mobileAccessibility=await scanAccessibility(page);
  check(mobileAccessibility.violations.length===0,'Mobile accessibility: '+JSON.stringify(mobileAccessibility.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
  if(screenshotDirectory){
   await page.screenshot({path:path.join(screenshotDirectory,'consultix-mobile-hero.png')});
   if(!await page.locator('.resource-library').evaluate(node=>node.open))await page.locator('.resource-library>summary').click();
   await page.locator('#strategic-finance').screenshot({path:path.join(screenshotDirectory,'consultix-finance-mobile-without-forecast.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
  }
  if(!await page.locator('.resource-library').evaluate(node=>node.open))await page.locator('.resource-library>summary').click();
  // Check every new panel at the narrow and wide extremes in both languages.
  for(const language of ['en','de']){
   await page.locator('[data-language='+language+']').click();
   for(const width of [320,768,1440]){
    await page.setViewportSize({width,height:1000});
    for(const [root,choices] of [['challenge-finder',['finance','analytics','revenue','systems','ai']],['alignment-flow',['pipeline','delivery','billing','planning']]]){
     for(const choice of choices){
      const button=page.locator('#'+root+' [data-choice='+choice+']');
      await button.click();
      const panelID=await button.getAttribute('aria-controls');
      check(await page.locator('#'+panelID).isVisible()&&await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),root+' '+choice+' displays without overflow at '+width+' in '+language);
     }
    }
    for(const segment of ['startup','saas','sme']){
     await page.locator('#business-guide [data-choice='+segment+']').click();
     check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Segment '+segment+' fits '+width+' in '+language);
    }
    for(const metric of ['margin','retention','runway']){
     if(!await page.locator('.metric-disclosure').evaluate(node=>node.open))await page.locator('.metric-disclosure>summary').click();
     await page.locator('[data-metric='+metric+']').click();
     check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Metric '+metric+' fits '+width+' in '+language);
    }
   }
  }
  await page.setViewportSize({width:390,height:844});
  if(screenshotDirectory){
   for(const language of ['en','de']){
    await page.locator('[data-language='+language+']').click();
    for(const [selector,name] of [['#qualifications','qualifications'],['#business-guide','segments'],['#metric-explorer','metrics'],['#revenue-finance','alignment']]){
     await page.locator(selector).screenshot({path:path.join(screenshotDirectory,'consultix-'+name+'-mobile-'+language+'.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
    }
   }
  }
  const noScriptContext=await browser.newContext({javaScriptEnabled:false});
  const noScriptPage=await noScriptContext.newPage();await noScriptPage.goto(origin);
  await noScriptPage.locator('.resource-library>summary').click();
  check(await noScriptPage.locator('#finance-title').isVisible(),'Finance copy is available without JavaScript');
  check(await noScriptPage.locator('#forecast-demo,.finance-noscript').count()===0,'The removed example is absent without JavaScript');
  check(!await noScriptPage.locator('#metric-explorer').isVisible(),'The inactive KPI calculator stays hidden without JavaScript');
  check(await noScriptPage.locator('#business-guide').isVisible()&&await noScriptPage.locator('#segment-startup').isVisible()&&await noScriptPage.locator('#segment-saas').isVisible()&&await noScriptPage.locator('#segment-sme').isVisible(),'All three business types remain readable without JavaScript');
  check(!await noScriptPage.locator('#credential-controls').isVisible()&&await noScriptPage.locator('.credential').count()===4,'Qualification images remain browsable without inactive carousel controls');
  check(await noScriptPage.locator('#practice-revenue').isVisible()&&await noScriptPage.locator('#contact').isVisible(),'Core services and contact remain available without JavaScript');
  check(!await noScriptPage.locator('#enquiry-form').isVisible(),'Without JavaScript the form cannot submit personal details in a URL');
  await noScriptPage.goto(origin+'/de/');
  check(await noScriptPage.locator('html').getAttribute('lang')==='de'&&(await noScriptPage.locator('#practice-finance h3').innerText()).includes('Finanzplanung'),'Direct German page renders translated services without JavaScript');
  check(await noScriptPage.locator('link[rel=canonical]').getAttribute('href')==='https://consultix.solutions/de/','Direct German page retains its canonical address');
  const directContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const directPage=await directContext.newPage();await directPage.goto(origin+'/de/');
  check(await directPage.locator('#metric-value').textContent()==='60,0%'&&await directPage.locator('#forecast-demo').count()===0,'Direct German URL initialises the metric explorer without the removed forecast');
  check(await directPage.locator('[data-language=de]').getAttribute('aria-pressed')==='true','Direct German URL selects the German toggle');
  check(!await directPage.locator('#metric-explorer .metric-workspace').isVisible(),'Direct German page also starts with a compact KPI section');
  await directPage.locator('.resource-library>summary').focus();await directPage.keyboard.press('Enter');
  await directPage.locator('.metric-disclosure>summary').focus();await directPage.keyboard.press('Enter');
  check(await directPage.locator('#metric-explorer .metric-workspace').isVisible()&&await directPage.locator('#metric-value').innerText()==='60,0%','German KPI disclosure opens with the keyboard and shows the calculated result');
  await directPage.locator('[data-language=en]').click();
  check(new URL(directPage.url()).pathname==='/'&&await directPage.locator('html').getAttribute('lang')==='en','English toggle returns to the English address');
  check(await directPage.locator('#business-guide').evaluate(node=>getComputedStyle(node.querySelector('[data-panel]:not([hidden])')).animationName)==='none','Reduced-motion setting disables panel animations');
  await directContext.close();
  const staticGerman=await noScriptPage.locator('[data-i]').evaluateAll(nodes=>nodes.map(node=>[node.dataset.i,node.textContent]));
  const germanCopy=require('../content.js').de;
  check(staticGerman.every(([key,text])=>text===germanCopy[key]),'Every static German copy element is translated before JavaScript');
  await noScriptContext.close();
  check(!/(?:href|src)="\.\//.test(html)&&!/(?:href|src)="\.\//.test(germanHTML),'Both preview files have their local scripts, fonts and graphics embedded');
  check(html.includes('data:font/woff2;base64,')&&germanHTML.includes('data:image/svg+xml;base64,'),'Standalone preview contains font and illustration data');
  check(errors.length===0,'No browser exceptions: '+errors.join(', '));
  check(externalRequests.length===0,'No third-party requests: '+externalRequests.join(', '));
  console.log('PASS: '+checks+' functional checks; desktop/mobile accessibility scans; no third-party requests.');
  if(chosenButtonContrast.size)console.log('KNOWN OWNER-SELECTED EXCEPTION: white text on the original orange buttons falls below AA text contrast ('+chosenButtonContrast.size+' element/state matches). All other accessibility findings are checked.');
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exit(1);});
