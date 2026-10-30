
(() => {
  const progress = document.querySelector('.progress');
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll progress bar
  const updateProgress = () => {
    if (!progress) return;

    const total =
      document.documentElement.scrollHeight - window.innerHeight;

    const value = total > 0 ? window.scrollY / total : 0;

    progress.style.transform =
      `scaleX(${Math.min(1, Math.max(0, value))})`;
  };

  window.addEventListener('scroll', updateProgress, {
    passive: true
  });

  window.addEventListener('resize', updateProgress);

  updateProgress();

  // Automatically update copyright year
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Scroll reveal animations
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  if (
    !reducedMotion.matches &&
    'IntersectionObserver' in window
  ) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08
    });

    document.querySelectorAll(
      '.service-card, .project-card, .timeline-item, .process-grid > div, .about-content'
    ).forEach(item => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  }
})();
