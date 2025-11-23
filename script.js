// ---------------- Modals ----------------
const modalBtns = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        const modal = document.getElementById(target);
        if(modal) modal.style.display = "block";
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = "none";
    });
});

// Close modal if clicked outside content
window.addEventListener('click', e => {
    modals.forEach(modal => {
        if(e.target === modal) modal.style.display = "none";
    });
});

// ---------------- Scroll-to-top ----------------
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// ---------------- Card fade-in animation ----------------
const cards = document.querySelectorAll('.card, .plan-card, .testimonial');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {threshold: 0.1});

cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.8s ease-out";
    observer.observe(card);
});

// ---------------- Smooth scroll for internal links ----------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---------------- Optional: Dynamic Year in Footer ----------------
const yearSpan = document.createElement('span');
yearSpan.textContent = new Date().getFullYear();
document.querySelector('footer p').appendChild(yearSpan);
