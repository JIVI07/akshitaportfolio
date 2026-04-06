/* ============================================
   AKSHITA SRIVASTAVA — PORTFOLIO SCRIPTS
   ============================================ */

/* ─────────────────────────────────────────────
   1. CUSTOM CURSOR
   ───────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Track precise cursor position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Smooth lagging ring animation
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Scale cursor on interactive elements
document.querySelectorAll('a, button').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform    = 'translate(-50%, -50%) scale(2)';
    cursorRing.style.opacity  = '0';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform    = 'translate(-50%, -50%) scale(1)';
    cursorRing.style.opacity  = '0.5';
  });
});


/* ─────────────────────────────────────────────
   2. SCROLL REVEAL
   ───────────────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* ─────────────────────────────────────────────
   3. SKILL BAR ANIMATIONS
   ───────────────────────────────────────────── */
const skillsSection = document.getElementById('skills');

const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach((fill) => {
          const targetWidth = parseFloat(fill.dataset.width);
          fill.style.transform = `scaleX(${targetWidth})`;
          fill.classList.add('animate');
        });
        // Stop observing once animated
        skillBarObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsSection) {
  skillBarObserver.observe(skillsSection);
}


/* ─────────────────────────────────────────────
   4. ACTIVE NAV LINK HIGHLIGHT
   ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener(
  'scroll',
  () => {
    let currentSection = '';

    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === '#' + currentSection;
      link.style.color = isActive ? 'var(--accent)' : '';
    });
  },
  { passive: true }
);


/* ─────────────────────────────────────────────
   5. SMOOTH ANCHOR SCROLL (Fallback)
   ───────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ─────────────────────────────────────────────
   6. NAVBAR SHADOW ON SCROLL
   ───────────────────────────────────────────── */
const navbar = document.querySelector('nav');

window.addEventListener(
  'scroll',
  () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  },
  { passive: true }
);