const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

const closeNav = () => {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'メニューを開く');
  document.body.classList.remove('nav-open');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  nav?.classList.toggle('is-open', !isOpen);
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
  document.body.classList.toggle('nav-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeNav();
});
updateHeader();

const revealElements = document.querySelectorAll('.reveal:not(.is-visible)');

if (reduceMotion) {
  revealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px' });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const counters = document.querySelectorAll('[data-count]');

const animateCounter = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if (reduceMotion) {
  counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
} else {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.7 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

document.querySelectorAll('[data-accordion] details').forEach((detail) => {
  detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    document.querySelectorAll('[data-accordion] details[open]').forEach((openDetail) => {
      if (openDetail !== detail) openDetail.removeAttribute('open');
    });
  });
});
