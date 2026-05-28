import './styles/style.css';

import { Router } from './utils/router';

const router = new Router();

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('a');
  if (target) {
    const href = target.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      router.navigate(href);
    }
  }
});

window.addEventListener('popstate', () => router.render(window.location.pathname));

router.render(window.location.pathname);