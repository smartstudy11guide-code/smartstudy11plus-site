// ---------------- Multiple Modals ----------------
const modalBtns = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closeBtns = document.querySelectorAll('.close');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        document.getElementById(target).style.display = "block";
    });
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.modal').style.display = "none";
    });
});

// Close modal on click outside
window.addEventListener('click', e => {
    modals.forEach(modal => {
        if(e.target === modal) modal.style.display = "none";
    });
});

// ---------------- Scroll to Top Button ----------------
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// ---------------- Card Fade-in Animation ----------------
const cards = document.querySelectorAll('.card');
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
