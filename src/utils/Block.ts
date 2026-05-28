import { EventBus } from './EventBus';

// Usamos genéricos (<P>) para que TypeScript sepa qué tipo de props recibe cada componente.
export class Block<P extends Record<string, unknown> = Record<string, unknown>> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private _element: HTMLElement | null = null;
  protected props: P;
  private eventBus: () => EventBus;

  constructor(props: P) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    // Envolvemos las props en nuestro Proxy observador
    this.props = this._makePropsProxy(props);

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  // Método que los componentes hijos pueden sobreescribir
  public componentDidMount() {}

  private _componentDidUpdate(oldProps: unknown[], newProps: unknown[]) {
    const response = this.componentDidUpdate(oldProps[0] as P, newProps[0] as P);
    if (response) {
      this._render();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public componentDidUpdate(oldProps: P, newProps: P) {
    return true; // Por defecto siempre re-renderiza si cambian las props
  }

  public setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  private _render() {
    // Aquí irá la lógica pesada de compilar Handlebars y actualizar el DOM (Lo haremos en la Parte 2)
    console.log('Renderizando componente...');
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