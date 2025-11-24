// SIDEBAR toggle (B)
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
if(sidebarToggle){
  sidebarToggle.addEventListener('click', ()=> {
    sidebar.classList.toggle('closed');
    // small animation: change width via inline style if closed
    if(sidebar.classList.contains('closed')) sidebar.style.width = '72px';
    else sidebar.style.width = '220px';
  });
}

// MOBILE menu button: scroll to top of nav (simple)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if(mobileMenuBtn){
  mobileMenuBtn.addEventListener('click', ()=> {
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// MODALS
document.querySelectorAll('[data-target]').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const id = btn.getAttribute('data-target');
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'flex';
  });
});
document.querySelectorAll('.modal .close').forEach(c=> c.addEventListener('click', ()=> c.closest('.modal').style.display = 'none' ));
window.addEventListener('click', e => {
  document.querySelectorAll('.modal').forEach(m => { if(e.target === m) m.style.display = 'none'; });
});

// SCROLL TOP
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', ()=> {
  if(window.scrollY > 300) scrollTop.style.display = 'block'; else scrollTop.style.display = 'none';
});
if(scrollTop) scrollTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Fade-in (IntersectionObserver)
const items = document.querySelectorAll('.card, .plan-card, .testimonial');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if(en.isIntersecting){
        en.target.style.opacity = 1;
        en.target.style.transform = 'translateY(0)';
        obs.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  items.forEach(it => {
    it.style.opacity = 0; it.style.transform = 'translateY(18px)'; it.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
    io.observe(it);
  });
}

// smooth internal anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if(href.length>1){
      const el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
  });
});

// dynamic year
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();
