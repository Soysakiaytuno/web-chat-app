type Listener = (...args: unknown[]) => void;

export class EventBus {
  private readonly listeners: Record<string, Listener[]>;

  constructor() {
    this.listeners = {};
  }

  public on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`No existe el evento: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  public emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((listener) => listener(...args));
  }
}