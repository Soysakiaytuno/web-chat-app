import Handlebars from 'handlebars';

import authLayout from '../partials/auth-layout.hbs?raw';
import input from '../components/input.hbs?raw';
import button from '../components/button.hbs?raw';

import loginPage from '../pages/login/login.hbs?raw';
import registerPage from '../pages/register/register.hbs?raw';
import error404Page from '../pages/404/404.hbs?raw';
import error500Page from '../pages/500/500.hbs?raw';
import chatPage from '../pages/chat/chat.hbs?raw';
import profilePage from '../pages/profile/profile.hbs?raw';
import profileEditPage from '../pages/profile/profile-edit.hbs?raw';
import passwordEditPage from '../pages/profile/password-edit.hbs?raw';

Handlebars.registerPartial('auth-layout', authLayout);
Handlebars.registerPartial('input', input);
Handlebars.registerPartial('button', button);

export class Router
{
    constructor()
    {}
    private routes: Record<string, string> = 
    {
        '/': loginPage,
        '/register': registerPage,
        '/404': error404Page,
        '/500': error500Page,
        '/chat': chatPage,
        '/profile': profilePage,
        '/profile-edit': profileEditPage,
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
        const templateSource = app.innerHTML = this.routes[path] || this.routes['/404'];
        const templateHandlebars = Handlebars.compile(templateSource);
        app.innerHTML = templateHandlebars({});
    }
}