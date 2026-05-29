export class Data
{
    private static instance: Data;
    declare private usuario: string;
    declare private password: string;
    declare private email: string;
    declare private nombre: string;
    declare private apellido: string;
    declare private telefono: string;

    private constructor()
    {
           
    }

    public static getInstance(): Data
    {
        if (!Data.instance) {
            Data.instance = new Data();
        }
        return Data.instance;
    }
    getUsuario(): string
    {
        return this.usuario;
    }
    getPassword(): string
    {
        return this.password;
    }
    getEmail(): string
    {
        return this.email;
    }
    getNombre(): string
    {
        return this.nombre;
    }
    getApellido(): string
    {
        return this.apellido;
    }
    getTelefono(): string
    {
        return this.telefono;
    }
    setUsuario(usuario: string): void
    {
        this.usuario = usuario;
    }
    setPassword(password: string): void
    {
        this.password = password;
    }
    setEmail(email: string): void
    {
        this.email = email;
    }
    setNombre(nombre: string): void
    {
        this.nombre = nombre;
    }
    setApellido(apellido: string): void
    {
        this.apellido = apellido;
    }
    setTelefono(telefono: string): void
    {
        this.telefono = telefono;
    }
}