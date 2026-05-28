import Handlebars from 'handlebars';
import './styles/style.css';

// 1. Importar los partials (componentes) como texto plano con ?raw
import authLayout from './partials/auth-layout.hbs?raw';
import input from './components/input.hbs?raw';
import button from './components/button.hbs?raw';

// 2. Importar las vistas (páginas)
import loginPage from './pages/login/login.hbs?raw';
import registerPage from './pages/register/register.hbs?raw';
import error404Page from './pages/404/404.hbs?raw';
import error500Page from './pages/500/500.hbs?raw';

// 3. Registrar los partials en Handlebars
Handlebars.registerPartial('auth-layout', authLayout);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);

// 4. Definir las rutas
const routes: Record<string, string> = {
  '/': loginPage,
  '/register': registerPage,
  '/404': error404Page,
  '/500': error500Page,
};

// 5. Lógica del Router
function navigate(path: string) {
  window.history.pushState({}, '', path);
  render(path);
}

function render(path: string) {
  const app = document.getElementById('app');
  if (!app) return;

  const templateSource = routes[path] || routes['/404'];
  const template = Handlebars.compile(templateSource);
  app.innerHTML = template({});
}

// 6. Interceptar los clicks en los enlaces (<a>) para que no recarguen la página
document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('a');
  if (target) {
    const href = target.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      navigate(href);
    }
  }
});

// 7. Escuchar cuando el usuario usa los botones de "Atrás/Adelante" del navegador
window.addEventListener('popstate', () => render(window.location.pathname));

// 8. Renderizado inicial basado en la URL actual
render(window.location.pathname);