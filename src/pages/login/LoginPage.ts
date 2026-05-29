import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import loginTemplate from './login.hbs?raw';
import { Input } from '../../components/Input';
import { Router } from '../../utils/router';

export class LoginPage extends Block {
  // Guardamos las referencias a los componentes hijos
  declare private loginInput: Input;
  declare private passwordInput: Input;

  constructor() {
    super({
      events: {
        submit: (e: Event) => this.onSubmit(e),
      },
    });
  }

  protected init() {
    this.loginInput = new Input({ name: 'login', label: 'Usuario', type: 'text', placeholder: 'Ingresa tu usuario' });
    this.passwordInput = new Input({ name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ingresa tu contraseña' });
    
    super.init(); // Llamamos al init del padre para que dispare el render
  }

  private onSubmit(e: Event) {
    e.preventDefault(); // Evitamos que la página se recargue
    const form = (e.target as HTMLElement).closest('form');
    
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // === TU TAREA (PASO 2) ===
      // 1. Ejecuta la validación visual llamando a this.loginInput.validate() y guárdalo.
      // 2. Ejecuta la validación visual llamando a this.passwordInput.validate() y guárdalo.
      // 3. Si alguno de los dos devolvió false, frena el envío con un `return`.
      const isLoginValid = this.loginInput.validate();
      const isPasswordValid = this.passwordInput.validate();
      if (!isLoginValid || !isPasswordValid) {
        return;
      }

      console.log('🚀 Datos recolectados y válidos:', data);
      new Router().navigate('/chat'); // Simulamos el inicio de sesión exitoso
    }
  }

  protected render(): HTMLElement | null {
    const template = Handlebars.compile(loginTemplate);
    const element = this.compile(template, this.props);
    
    // Ya no los instanciamos aquí, usamos las propiedades de la clase
    element.querySelector('[data-layout="input-login"]')?.replaceWith(this.loginInput.element!);
    element.querySelector('[data-layout="input-password"]')?.replaceWith(this.passwordInput.element!);

    return element;
  }
}