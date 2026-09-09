(() => {
  const tabs = [...document.querySelectorAll('[data-perspective]')];
  const panel = document.querySelector('#perspective-panel');
  const views = {
    building: {image:'occupancy-andorra.png',alt:'A 3D view of coloured building footprints across a valley town.',label:'BUILDING-LEVEL EXPOSURE',title:'A building is more than a footprint.',description:'Location is the start. Geometry, construction, occupancy, and estimated population turn a building into useful exposure data.',link:'open-data.html#open-data',action:'See Open Data ↗',source:'3D building visualization from the OXM presentation. Model attributes may include estimates.'},
    hazard: {image:'vesuvius-exposure.png',alt:'A Vesuvius-area map showing buildings, flood hazard, historic lava flows, and earthquake intensity.',label:'A MULTI-HAZARD LANDSCAPE',title:'One place, several hazards.',description:'A building sits in a landscape of hazards. Shared exposure data links building detail to earthquake, flood, and volcanic scenarios.',link:'projects.html',action:'See our projects ↗',source:'Vesuvius-area illustration from the OXM presentation; not live hazard information.'},
    value: {image:'bangkok-flood.png',alt:'A Bangkok river flood scenario with structural value aggregated by tile.',label:'PEOPLE, BUILDINGS & VALUE',title:'What is at stake.',description:'Exposure links buildings to the people who use them and to their estimated reconstruction value. With hazard and vulnerability data, it supports an estimate of consequences.',link:'open-data.html#open-data',action:'See Open Data ↗',source:'Bangkok scenario from the OXM presentation: 100-year river flood hazard and modeled structural value.'}
  };
  const activate = tab => {
    const view = views[tab.dataset.perspective];
    tabs.forEach(item => {item.setAttribute('aria-selected',String(item===tab));item.tabIndex=item===tab?0:-1;});
    panel.setAttribute('aria-labelledby',tab.id);
    const img=document.querySelector('#perspective-image');img.src='assets/gallery/'+view.image;img.alt=view.alt;
    for(const [id,text] of Object.entries({'perspective-label':view.label,'perspective-title':view.title,'perspective-description':view.description,'perspective-source':view.source,'perspective-number':`0${tabs.indexOf(tab)+1} / 03`}))document.getElementById(id).textContent=text;
    const link=document.querySelector('#perspective-link');link.href=view.link;link.textContent=view.action;
  };
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
      if(event.key==='Home')next=0;
      if(event.key==='End')next=tabs.length-1;
      if(next!==undefined){event.preventDefault();tabs[next].focus();activate(tabs[next]);}
    });
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('just-entered');observer.unobserve(entry.target);}});},{threshold:.12});
    document.querySelectorAll('.section-head,.immersive-case-grid>a,.gallery-item').forEach(el=>observer.observe(el));
  }
})();
