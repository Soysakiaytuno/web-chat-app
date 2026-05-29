import { Block } from '../utils/Block';
import { Validation } from '../utils/validators';
import Handlebars from 'handlebars';
import inputTemplate from './input.hbs?raw';

interface InputProps extends Record<string, unknown> {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  events?: Record<string, EventListener>;
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    // Registramos las props y el evento 'blur'
    super({
      ...props,
      events: {
        blur: (e: Event) => this.onBlur(e),
      },
    });
  }

  private onBlur(event: Event) {
    // El evento blur ahora solo necesita llamar a nuestro método principal
    this.validate();
  }

  public validate(): boolean {
    // === TU TAREA (PASO 1) ===
    
    // 1. Obtén el input HTML directamente del DOM del componente
    const inputEl = this.element?.querySelector('input') as HTMLInputElement;
    const value = inputEl ? inputEl.value : '';
    const name = this.props.name as string;

    // 2. Pega aquí toda la lógica del switch/case y la inyección en el errorSpan
    // que tenías antes.
    const validation = new Validation();
    let errorMessage: string | null = null;
    switch(name) 
    {
        case 'email':
            errorMessage = validation.validateEmail(value);
            break;
        case 'login':
            errorMessage = validation.validateLogin(value);
            break;
        case 'password':
            errorMessage = validation.validatePassword(value);
            break;
        case 'first_name':
            errorMessage = validation.validateName(value);
            break;
        case 'last_name':
            errorMessage = validation.validateName(value);
            break;
    }
    
    // Inyectamos el error en el DOM antes de retornar
    const errorSpan = this.element?.querySelector('.input-field__error') as HTMLSpanElement | null;
    if (errorSpan) {
        errorSpan.textContent = errorMessage || '';
    }

    // 3. Al final, debes retornar un booleano para decirle al padre si pasaste la prueba
    // Si hay un errorMessage, retorna false. Si es null, retorna true.
    if(errorMessage) 
    {
        return false;
    }
    return true; 
  }

  // Método extra muy útil para obtener el valor fácilmente
  public getValue(): string {
    const inputEl = this.element?.querySelector('input') as HTMLInputElement;
    return inputEl ? inputEl.value : '';
  }

  protected render(): HTMLElement | null {
    // Registramos la plantilla
    const template = Handlebars.compile(inputTemplate);
    // Usamos el método de la clase Block para generar el HTML real
    return this.compile(template, this.props);
  }
}