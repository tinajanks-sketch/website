'use strict';
// Small navigation enhancement for this design prototype only.
(() => {
  const button=document.querySelector('.menu-toggle');
  const navigation=document.getElementById('navigation');
  const close=()=>{button.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');};
  button.addEventListener('click',()=>{
    const open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);
  });
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('is-open')){close();button.focus();}});
  document.addEventListener('click',event=>{if(!event.target.closest('.masthead'))close();});
  window.addEventListener('resize',()=>{if(innerWidth>820)close();});
})();
