'use strict';
(() => {
 const tabs=document.querySelector('[data-c-tabs]');
 const buttons=[...tabs.querySelectorAll('[role=tab]')];
 const panels=[...document.querySelectorAll('.c-service-panels>.practice-row')];
 function select(index,focus=false){
  buttons.forEach((button,i)=>{button.setAttribute('aria-selected',String(i===index));button.tabIndex=i===index?0:-1;});
  panels.forEach((panel,i)=>{panel.hidden=i!==index;panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',buttons[i].id);panel.tabIndex=0;});
  if(focus){buttons[index].focus({preventScroll:true});buttons[index].scrollIntoView({block:'nearest',inline:'nearest'});}
 }
 function selectTarget(target){const panel=target?.closest('.c-service-panels>.practice-row');const index=panels.indexOf(panel);if(index>=0)select(index);}
 buttons.forEach((button,index)=>button.addEventListener('click',()=>select(index)));
 tabs.addEventListener('keydown',event=>{
  const index=buttons.indexOf(document.activeElement);if(index<0)return;
  let next;
  if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%buttons.length;
  else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index+buttons.length-1)%buttons.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=buttons.length-1;
  if(next!==undefined){event.preventDefault();select(next,true);}
 });
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');if(!link)return;
  try{selectTarget(document.getElementById(decodeURIComponent(link.hash.slice(1))));}catch{}
 });
 const revealHash=()=>{try{selectTarget(document.getElementById(decodeURIComponent(location.hash.slice(1))));}catch{}};
 const orientation=()=>tabs.setAttribute('aria-orientation',matchMedia('(max-width:900px)').matches?'horizontal':'vertical');
 window.addEventListener('hashchange',revealHash);window.addEventListener('resize',orientation);
 tabs.hidden=false;select(0);orientation();revealHash();
})();
