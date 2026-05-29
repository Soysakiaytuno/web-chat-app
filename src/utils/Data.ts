export class Data {
  private static instance: Data;
  
  // Usuario simulado en la "Base de Datos" por defecto
  private user: Record<string, string> = {
    login: 'mijael123',
    password: 'Password123',
    email: 'correo@ejemplo.com',
    first_name: 'Mijael',
    last_name: 'Ander',
    phone: '+123456789'
  };

  private constructor() {}

  public static getInstance(): Data {
    if (!Data.instance) {
      Data.instance = new Data();
    }
    return Data.instance;
  }

  public setUser(data: Record<string, string>) {
    this.user = { ...this.user, ...data };
  }

  public getUser(): Record<string, string> {
    return this.user;
  }
}