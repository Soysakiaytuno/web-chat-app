// c:\Users\Mijael Ander\Documents\AplicacionesWeb1\chat\src\utils\validators.ts
export class Validation
{
    validateEmail(email: string): string | null {
    // TU TAREA: Escribir una expresión regular que valide un correo
    // Si es válido, retorna null. Si es inválido, retorna "Correo no válido"
    for(let i = 0; i < email.length; i++)
    {
        if(email[i] === '@')
        {
            return null;
        }
    }
    return "Correo no válido";
    }

    validatePassword(password: string): string | null {
    // TU TAREA: La contraseña debe tener al menos 8 caracteres, 
    // una letra mayúscula y un número.
    // Retorna null si es válida, o un string con el error si no lo es.
    let list: boolean[] = [false, false, false];
    for(let i = 0; i < password.length; i++)
    {
        if(password[i] >= 'A' && password[i] <= 'Z')
        {
            list[0] = true;
        }
        if(password[i] >= '0' && password[i] <= '9')
        {
            list[1] = true;
        }
    }
    if(password.length >= 8 && list[0] && list[1])
    {
        list[2] = true;
        return null;
    }
    let errorMensaje = "";
    if(!list[0])
    {
        errorMensaje += "La contraseña debe contener al menos una letra mayúscula. ";
    }
    if(!list[1])
    {
        errorMensaje += "La contraseña debe contener al menos un numero. ";
    }
    if(!list[2])
    {
        errorMensaje += "La contraseña debe contener al menos 8 caracteres. ";
    }
    return errorMensaje.trim();
    }

    validateName(name: string): string | null {
    // TU TAREA: El nombre no debe estar vacío y solo debe contener letras
    if(name.trim() === '')
    {
        return "Nombre no válido";
    }
    for(let i = 0; i < name.length; i++)
    {
        if((name[i] < 'A' || name[i] > 'Z') && (name[i] < 'a' || name[i] > 'z') && name[i] !== ' ')
        {
            return "Nombre no válido";
        }
    }
    return null;
    }

// Puedes agregar validatePhone, validateLogin, etc.

}
