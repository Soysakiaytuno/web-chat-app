import Handlebars from 'handlebars';
import { Block } from './Block';
import { LoginPage } from '../pages/login/LoginPage';
import { Register } from '../pages/register/register';
import { ProfileEdit } from '../pages/profile/profile-edit';

import authLayout from '../partials/auth-layout.hbs?raw';
import input from '../components/input.hbs?raw';
import button from '../components/button.hbs?raw';

import error404Page from '../pages/404/404.hbs?raw';
import error500Page from '../pages/500/500.hbs?raw';
import chatPage from '../pages/chat/chat.hbs?raw';
import profilePage from '../pages/profile/profile.hbs?raw';
import passwordEditPage from '../pages/profile/password-edit.hbs?raw';

Handlebars.registerPartial('auth-layout', authLayout);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);

export class Router
{
    constructor()
    {}
    private routes: Record<string, string | (new () => Block)> = 
    {
        '/': LoginPage, // Ahora usamos la CLASE, no el string
        '/register': Register,
        '/404': error404Page,
        '/500': error500Page,
        '/chat': chatPage,
        '/profile': profilePage,
        '/profile-edit': ProfileEdit,
        '/password-edit': passwordEditPage,
    }
    public navigate(path: string): void
    {
        window.history.pushState({}, '', path);
        this.render(path);
    }

    public render(path: string): void
    {
        const app = document.getElementById('app');
        if (!app) {
            return;
        }
        
        const route = this.routes[path] || this.routes['/404'];
        app.innerHTML = ''; // Limpiamos el DOM

        if (typeof route === 'string') {
            const templateHandlebars = Handlebars.compile(route);
            app.innerHTML = templateHandlebars({});
        } else {
            const page = new route(); // Instanciamos el Block
            if (page.element) app.appendChild(page.element);
        }
    }
}