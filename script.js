// Smooth fade-in on scroll
function fadeInOnScroll() {
  document.querySelectorAll('.fade').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}
document.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', () => {
  fadeInOnScroll();
  // Auto open a gentle welcome modal once
  setTimeout(() => {
    openModal(`<h3>Welcome to SmartStudy11+ Guide</h3><p>Explore free courses or try a Pro plan for extra support.</p><p style="margin-top:12px"><button class="btn-primary" onclick="closeModal();location.href='courses.html'">Start now</button></p>`);
  }, 1600);
});

// Modal helpers
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
function openModal(html) {
  if (!modal) return;
  modalContent.innerHTML = html;
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}
document.addEventListener('click', (e) => {
  if (e.target.matches('.modal-close')) closeModal();
  if (e.target === modal) closeModal();
});

// Simple slider minor touch/keyboard support
(function simpleSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  let isDown = false, startX, scrollLeft;
  slider.addEventListener('mousedown', (e) => {
    isDown = true; slider.classList.add('active'); startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return; e.preventDefault();
    const x = e.pageX - slider.offsetLeft; const walk = (x - startX) * 1; slider.scrollLeft = scrollLeft - walk;
  });
})();

// Plan button interactions (open modal)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-choose');
  if (!btn) return;
  const plan = btn.getAttribute('data-plan') || 'Plan';
  openModal(`<h3>${plan} plan</h3><p>You selected the <strong>${plan}</strong> plan. For payments and signup we can integrate Stripe or Netlify Identity — contact us to set it up.</p><p style="margin-top:12px"><button class="btn-primary" onclick="closeModal()">Close</button></p>`);
});

// Contact form placeholder
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'contactForm') {
    // Netlify will handle real submission if form is configured
    alert('Thanks — your message was sent (Netlify will store submissions if enabled).');
  }
});


