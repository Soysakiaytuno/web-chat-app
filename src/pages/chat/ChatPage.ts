import { Block } from '../../utils/Block';
import Handlebars from 'handlebars';
import chatTemplate from './chat.hbs?raw';

export class ChatPage extends Block {
  constructor() {
    super({
      events: {
        click: (e: Event) => this.onClick(e),
        keydown: (e: KeyboardEvent) => this.onKeydown(e),
      },
    });
  }

  private onClick(e: Event) {
    const target = e.target as HTMLElement;

    // 1. Si hacemos clic en un chat de la lista (para abrirlo)
    if (target.closest('.chat-list__item')) {
      this.element?.querySelector('.chat-sidebar')?.classList.add('chat-sidebar--hidden');
      this.element?.querySelector('.chat-main')?.classList.add('chat-main--active');
      
      // Marcamos este chat con la clase activa para saber cuál está seleccionado
      this.element?.querySelectorAll('.chat-list__item').forEach(el => el.classList.remove('chat-list__item--active'));
      target.closest('.chat-list__item')?.classList.add('chat-list__item--active');

      // EXTRA MAGIA: Cambiar el nombre en la cabecera y limpiar los mensajes al entrar a un chat nuevo
      const chatName = target.closest('.chat-list__item')?.querySelector('.chat-list__name')?.textContent;
      const headerName = this.element?.querySelector('.chat-main__name');
      if (headerName && chatName) headerName.textContent = chatName;
      
      const messagesContainer = this.element?.querySelector('.chat-main__messages');
      if (messagesContainer) messagesContainer.innerHTML = ''; // Limpiamos para el nuevo chat
    }

    // 2. Si hacemos clic en el botón de atrás (para cerrarlo)
    if (target.closest('.chat-main__back-button')) {
      this.element?.querySelector('.chat-sidebar')?.classList.remove('chat-sidebar--hidden');
      this.element?.querySelector('.chat-main')?.classList.remove('chat-main--active');
    }
    // 3. Si hacemos clic en el botón de ENVIAR
    if (target.closest('.chat-main__send'))
    {
        this.sendMessage();
    }

    // 4. Mostrar/Ocultar el menú de opciones (3 puntitos)
    if (target.closest('.chat-main__options-btn')) {
        const menu = this.element?.querySelector('.chat-main__options-menu') as HTMLElement;
        if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }

    // 5. Si hacemos clic en Eliminar Chat
    if (target.closest('.chat-main__delete-btn')) {
        const activeChat = this.element?.querySelector('.chat-list__item--active') as HTMLElement; // ¡Faltaba el punto aquí!
        if(activeChat) activeChat.remove();
        
        const menu = this.element?.querySelector('.chat-main__options-menu') as HTMLElement;
        if (menu) menu.style.display = 'none';

        // Restauramos la vista móvil usando encadenamiento opcional para que sea más limpio
        this.element?.querySelector('.chat-sidebar')?.classList.remove('chat-sidebar--hidden');
        this.element?.querySelector('.chat-main')?.classList.remove('chat-main--active');
    }
    // 6. Si hacemos clic en el botón de adjuntar
    if (target.closest('.chat-main__attach')) {
        const menu = this.element?.querySelector('.chat-main__attach-menu') as HTMLElement;
        if (menu) menu.style.display = menu.style.display === 'none' ? 'flex' : 'none';
    }
  }

  private onKeydown(e: KeyboardEvent) {
      // Si presiona Enter y estaba escribiendo en el input
      if (e.key === 'Enter' && (e.target as HTMLElement).classList.contains('chat-main__input')) {
          this.sendMessage();
      }
  }

  private sendMessage() {
        // Le decimos a TypeScript explícitamente que esto es un Input HTML
        const chatElement = this.element?.querySelector('.chat-main__input') as HTMLInputElement;
        const messagesContainer = this.element?.querySelector('.chat-main__messages');
        
        if (chatElement && messagesContainer)
        {
            const text = chatElement.value.trim();
            if(text === '')
            {
                chatElement.value = '';
                return;
            }

            // Creamos los elementos de forma segura usando textContent (Prevención XSS)
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message chat-message--sent'
            const p = document.createElement('p');
            p.className = 'chat-message__text';
            p.textContent = text;
            const span = document.createElement('span');
            span.className = 'chat-message__time';
            const time = new Date();
            span.textContent = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
            msgDiv.appendChild(p);
            msgDiv.appendChild(span);

            messagesContainer.appendChild(msgDiv);

            chatElement.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }


    protected render(): HTMLElement | null {
    const template = Handlebars.compile(chatTemplate);
    return this.compile(template, this.props);
    }
}
