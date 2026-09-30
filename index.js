// Met chaque aperçu (iframe 1440 ou 390 px) à l'échelle de son cadre
const fit = new ResizeObserver(entries => entries.forEach(({ target, contentRect }) => {
  target.style.setProperty('--s', contentRect.width / Number(target.dataset.w));
}));
document.querySelectorAll('.screen[data-w]').forEach(el => fit.observe(el));
