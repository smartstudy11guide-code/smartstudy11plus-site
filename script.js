// Modals
document.querySelectorAll('.modal-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const id = btn.getAttribute('data-target');
    const modal = document.getElementById(id);
    if(modal) modal.style.display = 'flex';
  });
});
document.querySelectorAll('.modal .close').forEach(c=>{
  c.addEventListener('click', ()=> c.closest('.modal').style.display = 'none');
});
// close clicking outside
window.addEventListener('click', e=>{
  document.querySelectorAll('.modal').forEach(m=>{
    if(e.target === m) m.style.display = 'none';
  });
});

// scroll top
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', ()=> {
  if(window.scrollY > 300) scrollTop.style.display = 'block';
  else scrollTop.style.display = 'none';
});
scrollTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// fade-in for cards (Intersection Observer)
const elems = document.querySelectorAll('.card, .plan-card, .testimonial');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(ent=>{
    if(ent.isIntersecting){
      ent.target.style.opacity = 1;
      ent.target.style.transform = 'translateY(0)';
      io.unobserve(ent.target);
    }
  });
},{threshold:0.12});
elems.forEach(el=>{
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
  io.observe(el);
});

// smooth internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// dynamic year
const y = new Date().getFullYear();
const yEl = document.getElementById('year');
if(yEl) yEl.textContent = y;
