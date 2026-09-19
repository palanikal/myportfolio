(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const blocks = document.querySelectorAll('.reveal');
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.documentElement.classList.add('motion');
    blocks.forEach(block => observer.observe(block));
    reduced.addEventListener('change', event => {
      if (event.matches) document.documentElement.classList.remove('motion');
    });
  }
  const bar = document.querySelector('.reading-progress');
  let scheduled = false;
  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0})`;
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
