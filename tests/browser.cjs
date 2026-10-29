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
(async()=>{
 const html=fs.readFileSync(path.join(root,'dist/index.html'),'utf8');
 const germanHTML=fs.readFileSync(path.join(root,'dist/de/index.html'),'utf8');
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
  check((await page.locator('h1').innerText()).includes('Financial insight'),'English homepage renders');
  check(await page.locator('.practice-row').count()===5,'Five connected service practices');
  check(await page.locator('.engagement-card').count()===5,'Five focused project offers');
  check(await page.locator('link[rel=canonical]').getAttribute('href')==='https://consultix.solutions/','Selected domain');
  check(await page.evaluate(()=>document.fonts.check('500 16px Manrope')&&document.fonts.check('400 16px "DM Sans"')),'Embedded fonts load');
  check(!await page.locator('#site-header').evaluate(el=>el.classList.contains('is-scrolled')),'Header starts over hero');
  const screenshotDirectory=process.env.CONSULTIX_SCREENSHOTS;
  if(screenshotDirectory){fs.mkdirSync(screenshotDirectory,{recursive:true});await page.screenshot({path:path.join(screenshotDirectory,'consultix-hero.png')});await page.screenshot({path:path.join(screenshotDirectory,'consultix-full.png'),fullPage:true});}

  check((await page.locator('#practice-analytics h3').innerText()).includes('Data Analytics'),'Data analytics has a dedicated practice');
  check((await page.locator('#practice-systems h3').innerText()).includes('Revenue-to-Finance'),'Revenue-to-Finance has a dedicated practice');
  check(await page.locator('.review-offer').count()===1&&await page.locator('.ongoing-offer').count()===1,'Paid review and ongoing support are distinct offers');
  check(await page.locator('#review-title').innerText()==='Business Performance & Planning Review','A general business review is available');
  check(await page.locator('#founders,.founder-card,[data-i=cofounder]').count()===0,'The co-founder section is removed');
  check(!await page.locator('#testimonials').isVisible()&&await page.locator('.testimonial-card').count()===0,'Unsupplied testimonials stay hidden');
  check((await page.locator('#example-engagements').innerText()).includes('not completed client projects'),'Example scopes are distinguished from client case studies');
  check(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(link=>document.getElementById(link.getAttribute('href').slice(1)))),'All internal links point to existing sections');
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
  check(await page.locator('[data-kpi=forecastRevenue]').innerText()==='€1,641,646','Independent metric inputs never alter the forecast');
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
  await page.locator('.testimonial-carousel').focus();await page.keyboard.press('Home');
  check(await page.locator('#testimonial-previous').isDisabled(),'Home returns to the first quotation');
  await page.keyboard.press('End');
  check(await page.locator('#testimonial-next').isDisabled(),'End moves to the last quotation');
  await page.addScriptTag({path:axePath});
  const testimonialAccessibility=await page.evaluate(()=>axe.run(document.getElementById('testimonials'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
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

  check(await page.locator('#forecast-demo').isVisible(),'Interactive forecast is available');
  check(await page.locator('meta[name=robots]').getAttribute('content')==='noindex,nofollow','Review indexing setting is preserved');
  check(await page.locator('[data-kpi=actualRevenue]').innerText()==='€648,000','Year-to-date actual revenue reconciles');
  check(await page.locator('[data-kpi=forecastRevenue]').innerText()==='€1,641,646','Twelve-month forecast reconciles');
  check(await page.locator('#forecast-chart svg[role=img]').count()===1,'Chart has an accessible image role');
  check(await page.locator('[data-kpi=forecastResult]').innerText()==='€436,153','Default forecast uses the latest actual fixed costs');
  check((await page.locator('#forecast-fixed-base').innerText()).includes('€43,000'),'Fixed-cost baseline is visible');
  check((await page.locator('#forecast-annual-growth').innerText()).includes('26.8%'),'Annualised growth is visible');
  check(await page.locator('[data-bridge=fixedCostEffect]').innerText()==='-€12,000','Forecast bridge shows the fixed-cost variance');
  await page.locator('[data-variance-period=yearToDate]').click();
  check(await page.locator('[data-bridge=revenueEffect]').innerText()==='+€17,188'&&await page.locator('[data-bridge=variableCostEffect]').innerText()==='-€24,906','Actual variance bridge separates revenue and cost effects');
  check(await page.locator('[data-bridge=result]').innerText()==='€115,770','Actual variance bridge reconciles to the actual result');
  const actualRowsBefore=await page.locator('#forecast-table tr[data-kind=actual]').allTextContents();
  const actualSummaryBefore=await page.locator('[data-kpi=actualResult]').innerText();
  const baselineForecast=await page.locator('[data-kpi=forecastRevenue]').innerText();
  await page.locator('#forecast-growth').focus();await page.keyboard.press('ArrowRight');
  check(await page.locator('#forecast-growth').inputValue()==='2.5','Revenue assumption works with the keyboard');
  check(await page.locator('[data-kpi=forecastRevenue]').innerText()!==baselineForecast,'Changing growth updates forecast totals');
  check(JSON.stringify(await page.locator('#forecast-table tr[data-kind=actual]').allTextContents())===JSON.stringify(actualRowsBefore),'Changing assumptions preserves historical rows');
  check(await page.locator('[data-kpi=actualResult]').innerText()===actualSummaryBefore,'Changing assumptions preserves actual summaries');
  await page.locator('#forecast-cutoff').selectOption('9');
  check(await page.locator('#forecast-demo').getAttribute('data-forecast-start')==='2026-10'&&await page.locator('#forecast-demo').getAttribute('data-forecast-end')==='2027-09','Reporting cutoff rolls the full twelve-month horizon');
  check((await page.locator('#forecast-fixed-base').innerText()).includes('€44,000'),'Rolling cutoff updates the actual overhead baseline');
  check(await page.locator('#forecast-table tr[data-kind=forecast]').count()===12,'Exactly twelve forecast months are shown');
  check(await page.locator('#forecast-table tr[data-kind=actual]').count()===3,'Monthly view distinguishes the three recent actual months');
  await page.locator('#forecast-reset').click();
  check(await page.locator('#forecast-cutoff').inputValue()==='6'&&await page.locator('#forecast-growth').inputValue()==='2','Reset restores cutoff and assumptions');
  await page.locator('.forecast-details>summary').click();
  await page.locator('[data-forecast-metric=operatingResult]').click();
  check((await page.locator('#forecast-table tr[data-period="2026-04"] td').nth(2).innerText())==='€16,860','Monthly operating result matches the source figures');
  check((await page.locator('#forecast-table tr[data-period="2026-04"] td').nth(3).innerText())==='-€4,813','Budget-versus-actual operating variance reconciles');
  await page.locator('#forecast-variable-cost').focus();await page.keyboard.press('End');
  await page.locator('#forecast-fixed-cost').focus();await page.keyboard.press('End');
  await page.locator('#forecast-growth').focus();await page.keyboard.press('Home');
  check((await page.locator('[data-kpi=forecastResult]').innerText()).startsWith('-'),'Cost assumptions can produce a loss');
  check(await page.locator('#forecast-chart .forecast-zero-line').count()===1,'Chart shows a zero baseline for negative results');
  check(!(await page.locator('#forecast-chart').innerHTML()).includes('NaN'),'Negative scenarios produce valid chart coordinates');
  const [download]=await Promise.all([page.waitForEvent('download'),page.locator('#forecast-download').click()]);
  const csv=fs.readFileSync(await download.path(),'utf8');
  check(download.suggestedFilename()==='consultix-illustrative-forecast-en.csv'&&csv.includes('Hypothetical example'),'Export identifies the figures as illustrative');
  check(csv.includes('"2026-07","Forecast","EUR"')&&csv.includes('"114000"'),'CSV reflects the selected scenario');
  await page.locator('[data-language=de]').click();
  check(await page.locator('#forecast-growth').inputValue()==='-5'&&await page.locator('#forecast-demo').getAttribute('data-metric')==='operatingResult','Language switch preserves the scenario and metric');
  check(await page.locator('#challenge-finder [data-choice=analytics]').getAttribute('aria-pressed')==='true'&&await page.locator('#alignment-flow [data-choice=billing]').getAttribute('aria-pressed')==='true','Language changes preserve the challenge and information-flow selection');
  check((await page.locator('#forecast-title').innerText()).includes('Ergebnisplanung'),'Forecast interface is translated into German');
  check((await page.locator('#forecast-chart svg title').first().textContent()).includes('Betriebsergebnis'),'Chart accessibility text is translated');
  await page.locator('#forecast-reset').click();
  if(screenshotDirectory){
   await page.locator('.forecast-details').evaluate(node=>{node.open=false;});
   await page.locator('#forecast-demo').screenshot({path:path.join(screenshotDirectory,'consultix-forecast-de.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   await page.locator('[data-language=en]').click();
   await page.locator('#forecast-demo').screenshot({path:path.join(screenshotDirectory,'consultix-forecast-en.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   await page.locator('.finance-services-disclosure summary').click();
    await page.locator('.finance-services').screenshot({path:path.join(screenshotDirectory,'consultix-finance-services.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   for(const [selector,name] of [['#practices','practices'],['#challenge-finder','challenge-finder'],['#engagements','offers'],['#revenue-finance','alignment'],['#business-guide','segments'],['#metric-explorer','metrics']]){
    await page.locator(selector).screenshot({path:path.join(screenshotDirectory,'consultix-'+name+'.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
   }
   await page.locator('.forecast-details').evaluate(node=>{node.open=true;});
  }

  for(const language of ['de','en']){
   await page.locator('[data-language='+language+']').click();
   check(await page.locator('html').getAttribute('lang')===language,'Document language '+language);
   check(!(await page.locator('body').innerText()).includes('undefined'),'Complete translations '+language);
   check(!/Kristina|Aleksandar|Co-founder|Meet the people behind Consultix|Die Menschen hinter Consultix/.test(await page.locator('body').innerText()),'No co-founder content remains in '+language);
   for(const width of [320,390,768,1024,1440,1920]){
    await page.setViewportSize({width,height:1000});
    await page.waitForFunction(()=>document.querySelector('#forecast-chart svg').viewBox.baseVal.width===Math.max(260,Math.round(document.getElementById('forecast-chart').getBoundingClientRect().width)));
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow at '+width+' in '+language);
    check(await page.evaluate(()=>{
     const labels=[...document.querySelectorAll('.forecast-month-tick')].map(node=>node.getBoundingClientRect());
     return labels.every((bounds,index)=>index===0||bounds.left>=labels[index-1].right+2);
    }),'Chart month labels do not overlap at '+width+' in '+language);
   }
   await page.addScriptTag({path:axePath});
   const accessibility=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
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
  const mobileAccessibility=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
  check(mobileAccessibility.violations.length===0,'Mobile accessibility: '+JSON.stringify(mobileAccessibility.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))));
  if(screenshotDirectory){
   await page.screenshot({path:path.join(screenshotDirectory,'consultix-mobile-hero.png')});
   await page.locator('.forecast-details').evaluate(node=>{node.open=false;});
   await page.locator('#forecast-demo').screenshot({path:path.join(screenshotDirectory,'consultix-forecast-mobile.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
  }
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
     await page.locator('[data-metric='+metric+']').click();
     check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Metric '+metric+' fits '+width+' in '+language);
    }
   }
  }
  await page.setViewportSize({width:390,height:844});
  if(screenshotDirectory){
   for(const language of ['en','de']){
    await page.locator('[data-language='+language+']').click();
    for(const [selector,name] of [['#business-guide','segments'],['#metric-explorer','metrics'],['#revenue-finance','alignment']]){
     await page.locator(selector).screenshot({path:path.join(screenshotDirectory,'consultix-'+name+'-mobile-'+language+'.png'),style:'.site-header,.skip-link{visibility:hidden!important}'});
    }
   }
  }
  const noScriptContext=await browser.newContext({javaScriptEnabled:false});
  const noScriptPage=await noScriptContext.newPage();await noScriptPage.goto(origin);
  check(await noScriptPage.locator('#finance-title').isVisible(),'Finance copy is available without JavaScript');
  check(!await noScriptPage.locator('#forecast-demo').isVisible(),'Inactive controls are hidden without JavaScript');
  check(await noScriptPage.locator('.finance-noscript').isVisible(),'A no-script explanation accompanies the model');
  check(!await noScriptPage.locator('#metric-explorer').isVisible()&&!await noScriptPage.locator('#business-guide').isVisible(),'Inactive new interactions stay hidden without JavaScript');
  check(await noScriptPage.locator('#practice-revenue').isVisible()&&await noScriptPage.locator('#contact').isVisible(),'Core services and contact remain available without JavaScript');
  check(!await noScriptPage.locator('#enquiry-form').isVisible(),'Without JavaScript the form cannot submit personal details in a URL');
  await noScriptPage.goto(origin+'/de/');
  check(await noScriptPage.locator('html').getAttribute('lang')==='de'&&(await noScriptPage.locator('#practice-finance h3').innerText()).includes('Finanzplanung'),'Direct German page renders translated services without JavaScript');
  check(await noScriptPage.locator('link[rel=canonical]').getAttribute('href')==='https://consultix.solutions/de/','Direct German page retains its canonical address');
  const directContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const directPage=await directContext.newPage();await directPage.goto(origin+'/de/');
  check(await directPage.locator('#metric-value').innerText()==='60,0%'&&await directPage.locator('[data-kpi=actualRevenue]').innerText()==='648.000 €','Direct German URL initialises both financial tools in German');
  check(await directPage.locator('[data-language=de]').getAttribute('aria-pressed')==='true','Direct German URL selects the German toggle');
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
 }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exit(1);});
