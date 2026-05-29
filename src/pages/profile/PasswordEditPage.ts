import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import passwordEditTemplate from './password-edit.hbs?raw';
import { Input } from '../../components/Input';
import { Validation } from '../../utils/validators';
import { Router } from '../../utils/router';
import { Data } from '../../utils/Data';

export class PasswordEditPage extends Block {
  declare private oldPasswordInput: Input;
  declare private newPasswordInput: Input;
  declare private newPasswordConfirmInput: Input;

  constructor() {
    super({
      events: {
        submit: (e: Event) => this.onSubmit(e),
      },
    });
  }

  protected init() {
    this.oldPasswordInput = new Input({ name: 'oldPassword', label: 'Contraseña Actual', type: 'password', placeholder: '••••••••' });
    this.newPasswordInput = new Input({ name: 'newPassword', label: 'Nueva Contraseña', type: 'password', placeholder: '••••••••' });
    this.newPasswordConfirmInput = new Input({ name: 'newPasswordConfirm', label: 'Confirmar Nueva Contraseña', type: 'password', placeholder: '••••••••' });
    
    super.init();
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    
    const isOldValid = this.oldPasswordInput.validate();
    const isNewValid = this.newPasswordInput.validate();
    const isConfirmValid = this.newPasswordConfirmInput.validate();

    if (!isOldValid || !isNewValid || !isConfirmValid) return;

    const oldPassword = this.oldPasswordInput.getValue();
    const newPassword = this.newPasswordInput.getValue();
    const newPasswordConfirm = this.newPasswordConfirmInput.getValue();

    const validation = new Validation();
    
    // Validar que las contraseñas nuevas coincidan
    const matchError = validation.validateSamePassword(newPassword, newPasswordConfirm);
    if (matchError) {
      const errorSpan = this.newPasswordConfirmInput.element?.querySelector('.input-field__error');
      if (errorSpan) errorSpan.textContent = matchError;
      return;
    }

    // Guardamos la nueva contraseña en nuestra clase Data y regresamos al Perfil
    Data.getInstance().setUser({ password: newPassword });
    console.log('🚀 Contraseña actualizada con éxito');
    new Router().navigate('/profile');
  }

  protected render(): HTMLElement | null {
    const template = Handlebars.compile(passwordEditTemplate);
    const element = this.compile(template, this.props);
    element.querySelector('[data-layout="input-old-password"]')?.replaceWith(this.oldPasswordInput.element!);
    element.querySelector('[data-layout="input-new-password"]')?.replaceWith(this.newPasswordInput.element!);
    element.querySelector('[data-layout="input-new-password-confirm"]')?.replaceWith(this.newPasswordConfirmInput.element!);
    return element;
  }
}