/* UNIVERSAL SCRIPT — SmartStudy11+
   Handles:
   - All mobile navbars (nav, nav2, nav3...)
   - Modals
   - Smooth anchors
   - Intersection animations
   - Dynamic footer year
*/

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     UNIVERSAL MOBILE NAV
  ------------------------- */
  document.querySelectorAll('[class^="nav-toggle"]').forEach(toggle => {
    toggle.addEventListener("click", () => {
      const num = toggle.className.match(/\d+/)?.[0] || "";
      const nav = document.querySelector(`.main-nav${num}`);
      if (!nav) return;

      nav.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  });

  // Close nav when clicking a link
  document.querySelectorAll('[class^="main-nav"] a').forEach(link => {
    link.addEventListener("click", () => {
      const navClass = [...link.closest("nav").classList].find(c => c.startsWith("main-nav"));
      const num = navClass.match(/\d+/)?.[0] || "";

      const nav = document.querySelector(`.main-nav${num}`);
      const toggle = document.querySelector(`.nav-toggle${num}`);

      if (nav) nav.classList.remove("open");
      if (toggle) toggle.classList.remove("open");
    });
  });

  /* -------------------------
     MODALS
  ------------------------- */
  document.querySelectorAll(".btn-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.modal;
      const modal = document.getElementById(id);
      if (modal) modal.style.display = "flex";
    });
  });

  document.querySelectorAll(".modal-close").forEach(x => {
    x.addEventListener("click", () => {
      x.closest(".modal").style.display = "none";
    });
  });

  // click outside modal closes it
  window.addEventListener("click", e => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });

  /* -------------------------
     SMOOTH SCROLL
  ------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const targetID = a.getAttribute("href");

      if (targetID.length < 2) return;

      const target = document.querySelector(targetID);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* -------------------------
     INTERSECTION ANIMATION
  ------------------------- */
  const revealList = document.querySelectorAll(
    ".card, .plan-card, .testimonial, .testimonial-block"
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealList.forEach(el => {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      el.style.transition = "all .7s cubic-bezier(.2,.9,.2,1)";
      io.observe(el);
    });
  }

  /* -------------------------
     DYNAMIC FOOTER YEAR
  ------------------------- */
  const year = new Date().getFullYear();

  document.querySelectorAll('[id^="year"]').forEach(span => {
    span.textContent = year;
  });

  /* -------------------------
     SCROLL TO TOP BUTTON
  ------------------------- */
  const scrollBtn = document.getElementById("scrollTop");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
