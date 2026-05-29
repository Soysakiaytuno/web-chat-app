import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import chatTemplate from './chat.hbs?raw';

export class ChatPage extends Block {
  constructor() {
    super({
      events: {
        click: (e: Event) => this.onClick(e),
      },
    });
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement;

    // 1. Si hacemos clic en un chat de la lista (para abrirlo)
    if (target.closest('.chat-list__item')) {
      this.element?.querySelector('.chat-sidebar')?.classList.add('chat-sidebar--hidden');
      this.element?.querySelector('.chat-main')?.classList.add('chat-main--active');
    }

    // 2. Si hacemos clic en el botón de atrás (para cerrarlo)
    if (target.closest('.chat-main__back-button')) {
      this.element?.querySelector('.chat-sidebar')?.classList.remove('chat-sidebar--hidden');
      this.element?.querySelector('.chat-main')?.classList.remove('chat-main--active');
    }
  }

  protected render(): HTMLElement | null {
    const template = Handlebars.compile(chatTemplate);
    return this.compile(template, this.props);
  }
}