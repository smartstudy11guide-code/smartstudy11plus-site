/* site-wide scripts for SmartStudy11+ Guide
   - mobile nav
   - modals
   - smooth anchors
   - dynamic year
*/

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle (top navbar)
  const navToggleButtons = document.querySelectorAll('.nav-toggle');
  navToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      if (!nav) return;
      nav.classList.toggle('open'); // CSS hides .main-nav on small screens
      btn.classList.toggle('open');
    });
  });

  // Close mobile nav when clicking a link
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', () => {
      const nav = document.querySelector('.main-nav');
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      document.querySelectorAll('.nav-toggle').forEach(b => b.classList.remove('open'));
    });
  });

  // Modals (data-modal)
  document.querySelectorAll('.btn-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(id);
      if (modal) modal.style.display = 'flex';
    });
  });

  document.querySelectorAll('.modal-close').forEach(x => {
    x.addEventListener('click', () => x.closest('.modal').style.display = 'none');
  });

  // Close modal clicking outside
  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(m => {
      if (e.target === m) m.style.display = 'none';
    });
  });

  // Smooth internal anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Intersection observer for reveal
  const revealEls = document.querySelectorAll('.card, .plan-card, .testimonial, .testimonial-block');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(18px)';
      el.style.transition = 'all .7s cubic-bezier(.2,.9,.2,1)';
      io.observe(el);
    });
  }

  // Scroll-to-top visibility
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      scrollTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Dynamic year placeholders (multiple pages)
  for (let i = 1; i <= 7; i++) {
    const el = document.getElementById('year' + (i === 1 ? '' : i));
    if (el) el.textContent = new Date().getFullYear();
  }
});
