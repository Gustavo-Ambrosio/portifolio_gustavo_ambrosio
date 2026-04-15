/* ===========================
   PORTFOLIO SCRIPT
   =========================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Typing effect ----
const titles = [
  'Full-Stack Developer',
  'QA & Test Automation Engineer',
  'Systems Analyst',
  'Open Source Contributor',
  'DevOps Enthusiast',
];
const typedEl = document.getElementById('typed-title');
let titleIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeWriter() {
  const current = titles[titleIdx];
  const speed = isDeleting ? 40 : 80;

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      setTimeout(() => { isDeleting = true; typeWriter(); }, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
    }
  }
  setTimeout(typeWriter, speed);
}
typeWriter();

// ---- Floating particles ----
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 28;
const COLORS = ['#22d3ee', '#a855f7', '#818cf8', '#38bdf8'];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 3 + 1.5;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const duration = Math.random() * 14 + 10;
  const delay = Math.random() * 15;
  const left = Math.random() * 100;

  p.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    left: ${left}%;
    bottom: -10px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    box-shadow: 0 0 ${size * 2}px ${color};
  `;
  particleContainer.appendChild(p);
}

// ---- Intersection observer for animations ----
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.delay || 0;
      setTimeout(() => {
        el.classList.add('visible');
      }, parseInt(delay));
    }
  });
}, observerOptions);

// Observe skill categories
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// Observe cert cards
document.querySelectorAll('.cert-card').forEach(el => observer.observe(el));

// ---- Language bars animation ----
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(bar => {
        const target = bar.style.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = target; }, 100);
        });
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const langSection = document.querySelector('.languages-wrap');
if (langSection) langObserver.observe(langSection);

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--cyan)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ---- Smooth hover glow on project cards ----
document.querySelectorAll('.project-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c🚀 Gustavo Ambrosio - Portfolio', 'color: #22d3ee; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ and lots of ☕', 'color: #a855f7; font-size: 12px;');
