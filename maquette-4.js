(() => {
  const body = document.body;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Révélation au défilement
  const reveal = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => reduce ? el.classList.add('in') : reveal.observe(el));

  // En-tête compact au défilement
  const onScroll = () => body.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Menu mobile
  const burger = document.querySelector('[data-burger]');
  const nav = document.getElementById('site-nav');
  const setNav = open => {
    body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };
  burger.addEventListener('click', () => setNav(!body.classList.contains('nav-open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setNav(false)));
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) { setNav(false); burger.focus(); }
  });
  matchMedia('(min-width: 961px)').addEventListener('change', e => e.matches && setNav(false));

  // Lien actif dans la navigation
  const links = new Map([...nav.querySelectorAll('.nav-links a')].map(a => [a.hash.slice(1), a]));
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    const link = links.get(e.target.id);
    if (!link) return;
    if (e.isIntersecting) { links.forEach(l => l.removeAttribute('aria-current')); link.setAttribute('aria-current', 'true'); }
    else link.removeAttribute('aria-current');
  }), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  // Bouton d'appel mobile : visible hors du hero et du contact
  const bar = document.querySelector('.callbar');
  if (bar) {
    const seen = {};
    const watch = new IntersectionObserver(entries => {
      entries.forEach(e => { seen[e.target.dataset.bar] = e.isIntersecting; });
      bar.classList.toggle('is-visible', !seen.hero && !seen.contact);
    });
    document.querySelectorAll('[data-bar]').forEach(el => watch.observe(el));
  }
})();
