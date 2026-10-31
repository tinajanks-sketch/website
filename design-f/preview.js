'use strict';
(() => {
  const menu=document.querySelector('.menu-toggle');
  const navigation=document.getElementById('navigation');
  function closeMenu(){navigation.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));});
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('click',event=>{if(!event.target.closest('.masthead'))closeMenu();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('is-open')){closeMenu();menu.focus();}});
  window.addEventListener('resize',()=>{if(innerWidth>850)closeMenu();});

  const mapButtons=[...document.querySelectorAll('[data-map]')];
  const mapPanels=[...document.querySelectorAll('[data-map-panel]')];
  function selectMap(key){mapButtons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.map===key)));mapPanels.forEach(panel=>panel.hidden=panel.dataset.mapPanel!==key);}
  mapButtons.forEach(button=>button.addEventListener('click',()=>selectMap(button.dataset.map)));
  selectMap('revenue');

  const track=document.getElementById('capability-track');
  const panels=[...track.querySelectorAll('.capability-panel')];
  const previous=document.getElementById('service-previous');
  const next=document.getElementById('service-next');
  const position=document.querySelector('.gallery-position');
  let index=0,frame;
  function panelOffset(panel){return panel.getBoundingClientRect().left-track.getBoundingClientRect().left+track.scrollLeft-parseFloat(getComputedStyle(track).paddingLeft);}
  function updateGallery(){
    const max=track.scrollWidth-track.clientWidth;
    if(track.scrollLeft>=max-3)index=panels.length-1;
    else index=panels.reduce((closest,panel,i)=>Math.abs(panelOffset(panel)-track.scrollLeft)<Math.abs(panelOffset(panels[closest])-track.scrollLeft)?i:closest,0);
    previous.disabled=track.scrollLeft<3;next.disabled=track.scrollLeft>=max-3;
    position.textContent=(index+1)+' / '+panels.length;
  }
  function goTo(i){
    const selected=Math.max(0,Math.min(panels.length-1,i));
    track.scrollTo({left:panelOffset(panels[selected]),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  previous.addEventListener('click',()=>goTo(index-1));next.addEventListener('click',()=>goTo(index+1));
  track.addEventListener('scroll',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(updateGallery);},{passive:true});
  track.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
    event.preventDefault();goTo(event.key==='Home'?0:event.key==='End'?panels.length-1:index+(event.key==='ArrowRight'?1:-1));
  });
  window.addEventListener('resize',updateGallery);updateGallery();

  // Qualifications use a native horizontal image rail, with no extra CTA buttons.
  const qualifications=document.querySelector('.qualification-gallery');
  const qualificationItems=[...qualifications.querySelectorAll('.qualification-item')];
  qualifications.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)||qualifications.scrollWidth<=qualifications.clientWidth+2)return;
    event.preventDefault();
    const offset=item=>item.getBoundingClientRect().left-qualifications.getBoundingClientRect().left+qualifications.scrollLeft;
    const focused=qualificationItems.indexOf(document.activeElement);
    const current=focused>=0?focused:qualificationItems.reduce((nearest,item,i)=>Math.abs(offset(item)-qualifications.scrollLeft)<Math.abs(offset(qualificationItems[nearest])-qualifications.scrollLeft)?i:nearest,0);
    const selected=Math.max(0,Math.min(qualificationItems.length-1,event.key==='Home'?0:event.key==='End'?qualificationItems.length-1:current+(event.key==='ArrowRight'?1:-1)));
    if(focused>=0)qualificationItems[selected].focus({preventScroll:true});
    qualifications.scrollTo({left:offset(qualificationItems[selected]),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });

  const business=document.getElementById('business-type');
  const audiencePanels=[...document.querySelectorAll('[data-audience]')];
  function selectBusiness(){audiencePanels.forEach(panel=>panel.hidden=panel.dataset.audience!==business.value);}
  business.addEventListener('change',selectBusiness);selectBusiness();
})();
