// c:\Users\Mijael Ander\Documents\AplicacionesWeb1\chat\src\utils\validators.ts
export class Validation
{
    validateEmail(email: string): string | null {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Correo electrónico no válido";
        }
        return null;
    }

    validatePassword(password: string): string | null {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return "Debe tener 8+ caracteres, una mayúscula y un número";
        }
        return null;
    }

    validateName(name: string): string | null {
        if (name.trim() === '') {
            return "El campo no puede estar vacío";
        }
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!nameRegex.test(name)) {
            return "Solo debe contener letras";
        }
        return null;
    }

    validateLogin(login: string): string | null {
        if (login.trim().length < 3) {
            return "El usuario debe tener al menos 3 caracteres";
        }
        return null;
    }

    validatePhone(phone: string): string | null {
        // ^      : Empieza con
        // \+?    : El símbolo '+' (escapado con \), y el '?' lo hace opcional
        // \d     : Solo números (dígitos)
        // {8,15} : Entre 8 y 15 números
        // $      : Termina aquí
        const phoneRegex = /^\+?\d{8,15}$/;
        if (!phoneRegex.test(phone)) {
            return "Debe contener entre 8 y 15 números (puede incluir + al inicio)";
        }
        return null;
    }

    validateSamePassword(password: string, matchPassword: string): string | null 
    {
        if (password !== matchPassword) {
            return "Las contraseñas no coinciden";
        }
        return null;
    }
}
