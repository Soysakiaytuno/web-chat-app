import { EventBus } from './EventBus';

// Usamos genéricos (<P>) para que TypeScript sepa qué tipo de props recibe cada componente.
export class Block<P extends Record<string, unknown> = Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  protected _element: HTMLElement | null = null;
  protected props: P;
  private eventBus: () => EventBus;

  constructor(props: P = {} as P) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    // Envolvemos las props en nuestro Proxy observador
    this.props = this._makePropsProxy(props || {} as P);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  protected init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Método que los componentes hijos pueden sobreescribir
  public componentDidMount() {}

  private _componentDidUpdate(...args: unknown[]) {
    const oldProps = args[0] as P;
    const newProps = args[1] as P;
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  public componentDidUpdate(_oldProps: P, _newProps: P) {
    return true;
  }

  public setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();

    // Eliminamos los eventos viejos antes de actualizar el DOM para evitar fugas de memoria
    this._removeEvents();

    // Si ya existía un elemento en el DOM, lo reemplazamos con el nuevo
    if (this._element && block) {
      this._element.replaceWith(block);
    }

    if (block) {
      this._element = block;
      // Añadimos los eventos al nuevo elemento
      this._addEvents();
    }
  }

  // Método que los componentes hijos deben sobreescribir
  protected render(): HTMLElement | null {
    return null;
  }

  // Compila una plantilla de Handlebars y devuelve un elemento HTML real
  protected compile(template: (context: unknown) => string, context: unknown): HTMLElement {
    const htmlString = template(context);
    const tempElement = document.createElement('template');
    tempElement.innerHTML = htmlString;
    return tempElement.content.firstElementChild as HTMLElement;
  }

  private _addEvents() {
    const { events = {} } = this.props as { events?: Record<string, EventListener> };
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props as { events?: Record<string, EventListener> };
    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  private _makePropsProxy(props: P): P {
    return new Proxy(props, {
      set: (target, prop: string, value) => {
        const oldTarget = { ...target };
        target[prop as keyof P] = value;
        // ¡MAGIA! Cuando alguien cambia una prop, disparamos el evento de actualización
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
    });
  }
}