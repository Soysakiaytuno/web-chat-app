import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import registerTemplate from './register.hbs?raw';
import { Input } from '../../components/Input';
import { Router } from '../../utils/router';
import { Data } from '../../utils/Data';

export class Register extends Block {
  declare private loginInput: Input;
  declare private passwordInput: Input;
  declare private emailInput: Input;
  declare private firstNameInput: Input;
  declare private lastNameInput: Input;
  declare private phoneInput: Input;

  constructor() {
    super({
      events: {
        submit: (e: Event) => this.onSubmit(e),
      },
    });
  }

  protected init() {
    this.emailInput = new Input({name: 'email', label: 'Correo', type: 'text', placeholder: 'Ingresa tu correo electrónico'});
    this.loginInput = new Input({ name: 'login', label: 'Usuario', type: 'text', placeholder: 'Ingresa tu usuario' });
    this.firstNameInput = new Input({name: 'first_name', label: 'Nombre', type: 'text', placeholder: 'Ingresa tu nombre'});
    this.lastNameInput = new Input({name: 'last_name', label: 'Apellido', type: 'text', placeholder: 'Ingresa tu apellido'});
    this.phoneInput = new Input({name: 'phone', label: 'Teléfono', type: 'text', placeholder: 'Ingresa tu teléfono'});
    this.passwordInput = new Input({ name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Ingresa tu contraseña' });
    super.init(); // Llamamos al init del padre para que dispare el render
  }

  private onSubmit(e: Event) {
    e.preventDefault(); // Evitamos que la página se recargue
    const form = (e.target as HTMLElement).closest('form');
    
    if (form) {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const isLoginValid = this.loginInput.validate();
      const isPasswordValid = this.passwordInput.validate();
      const isEmailValid = this.emailInput.validate();
      const isFirst_nameValid = this.firstNameInput.validate();
      const isLast_nameValid = this.lastNameInput.validate();
      const isPhoneValid = this.phoneInput.validate();
      if (!isLoginValid || !isPasswordValid || !isEmailValid || !isFirst_nameValid || !isLast_nameValid || !isPhoneValid) {
        return;
      }

      // Guardamos el usuario en nuestro estado global (Data)
      const store = Data.getInstance();
      store.setUser(data as Record<string, string>);

      console.log('🚀 Usuario registrado con éxito:', store.getUser());
      new Router().navigate('/chat'); // Simulamos el inicio de sesión exitoso
    }
  }

  protected render(): HTMLElement | null {
    const template = Handlebars.compile(registerTemplate);
    const element = this.compile(template, this.props);
    
    // Ya no los instanciamos aquí, usamos las propiedades de la clase
    element.querySelector('[data-layout="input-login"]')?.replaceWith(this.loginInput.element!);
    element.querySelector('[data-layout="input-password"]')?.replaceWith(this.passwordInput.element!);
    element.querySelector('[data-layout="input-email"]')?.replaceWith(this.emailInput.element!);
    element.querySelector('[data-layout="input-first-name"]')?.replaceWith(this.firstNameInput.element!);
    element.querySelector('[data-layout="input-last-name"]')?.replaceWith(this.lastNameInput.element!);
    element.querySelector('[data-layout="input-phone"]')?.replaceWith(this.phoneInput.element!);

    return element;
  }
}