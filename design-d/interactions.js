'use strict';
(() => {
 const header=document.getElementById('site-header');
 const toggle=document.getElementById('menu-toggle');
 const drawer=document.getElementById('mobile-drawer');
 const backdrop=document.querySelector('.menu-backdrop');
 const close=document.querySelector('.drawer-close');
 const main=document.getElementById('main');
 const footer=document.querySelector('.site-footer');
 const brand=header.querySelector('.brand');
 const actions=header.querySelector('.header-actions');
 let wasOpen=false;
 function syncDrawer(){
  const mobile=matchMedia('(max-width:1000px)').matches;
  const open=mobile&&header.classList.contains('menu-open');
  backdrop.hidden=!open;document.body.classList.toggle('drawer-open',open);
  main.inert=open;footer.inert=open;brand.inert=open;actions.inert=open;
  drawer.inert=mobile&&!open;drawer.setAttribute('role',open?'dialog':'group');
  if(open)drawer.setAttribute('aria-modal','true');else drawer.removeAttribute('aria-modal');
  if(open&&!wasOpen)close.focus({preventScroll:true});
  if(!open&&wasOpen)toggle.focus({preventScroll:true});
  wasOpen=open;
 }
 close.addEventListener('click',()=>{if(header.classList.contains('menu-open'))toggle.click();});
 backdrop.addEventListener('click',()=>{if(header.classList.contains('menu-open'))toggle.click();});
 new MutationObserver(syncDrawer).observe(header,{attributes:true,attributeFilter:['class']});
 window.addEventListener('resize',syncDrawer);
 drawer.addEventListener('keydown',event=>{
  if(!wasOpen||event.key!=='Tab')return;
  const focusable=[...drawer.querySelectorAll('a[href],button:not(:disabled)')].filter(node=>node.getClientRects().length);
  const first=focusable[0],last=focusable.at(-1);
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 syncDrawer();

 // Progressive enhancement: readable immediately without JavaScript or motion.
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const sections=[...document.querySelectorAll('main>section:not(.hero),main>.resource-library')];
 let observer;
 function configureMotion(){
  observer?.disconnect();
  if(preference.matches||typeof IntersectionObserver!=='function'){
   document.body.classList.remove('motion-ready');sections.forEach(node=>node.classList.remove('section-enter'));return;
  }
  document.body.classList.add('motion-ready');
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-entered');observer.unobserve(entry.target);}}),{threshold:.06,rootMargin:'0px 0px -16px 0px'});
  sections.forEach(node=>{node.classList.add('section-enter');observer.observe(node);});
 }
 document.addEventListener('focusin',event=>event.target.closest('.section-enter')?.classList.add('is-entered'));
 preference.addEventListener('change',configureMotion);configureMotion();
})();
