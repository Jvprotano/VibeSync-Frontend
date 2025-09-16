import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HelperService {
    constructor() { }

    isValidPassword(password: string): { isValid: boolean, errorMessage: string } {

        let passwordErrorMessage = '';

        if (password.length < 8) {
            passwordErrorMessage += '<br> - A senha deve ter pelo menos 8 caracteres.';
        }
        if (!/[A-Z]/.test(password)) {
            passwordErrorMessage += '<br> - A senha deve conter pelo menos uma letra maiúscula.';
        }
        if (!/[a-z]/.test(password)) {
            passwordErrorMessage += '<br> - A senha deve conter pelo menos uma letra minúscula.';
        }
        if (!/\d/.test(password)) {
            passwordErrorMessage += '<br> - A senha deve conter pelo menos um número.';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            passwordErrorMessage += '<br> - A senha deve conter pelo menos um caractere especial.';
        }

        if (passwordErrorMessage) {
            return { isValid: false, errorMessage: passwordErrorMessage.slice(4) };
        }

        return { isValid: true, errorMessage: '' };
    }

    isValidEmail(userEmail: string): boolean {
        if (!userEmail || userEmail.trim() === '') {
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(userEmail);
    }
}