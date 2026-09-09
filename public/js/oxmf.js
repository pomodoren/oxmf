document.querySelector('#year').textContent = new Date().getFullYear();
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const cards = [...document.querySelectorAll('[data-category]')];
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('#project-count').textContent = `${count} collection ${count === 1 ? 'entry' : 'entries'}`;
  });
}
const menu = document.querySelector('.mobile-nav');
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
});
document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });

// Real image links remain usable when JavaScript is unavailable.
const galleryDialog = document.querySelector('.gallery-dialog');
const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
if (galleryDialog && typeof galleryDialog.showModal === 'function') {
  let current = 0;
  const showFigure = index => {
    current = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[current];
    const image = galleryDialog.querySelector('.gallery-full');
    image.src = link.href;
    image.alt = link.dataset.description;
    document.querySelector('#gallery-dialog-title').textContent = link.dataset.title;
    document.querySelector('#gallery-description').textContent = link.dataset.description;
    document.querySelector('#gallery-position').textContent = `${current + 1} / ${galleryLinks.length}`;
  };
  galleryLinks.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showFigure(index);
    galleryDialog.showModal();
  }));
  galleryDialog.querySelector('.gallery-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('[data-gallery-prev]').addEventListener('click', () => showFigure(current - 1));
  galleryDialog.querySelector('[data-gallery-next]').addEventListener('click', () => showFigure(current + 1));
  galleryDialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      showFigure(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  galleryDialog.addEventListener('click', event => {
    const bounds = galleryDialog.getBoundingClientRect();
    if (event.target === galleryDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) galleryDialog.close();
  });
}
