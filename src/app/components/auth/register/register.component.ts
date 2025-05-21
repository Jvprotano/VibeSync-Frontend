import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  fullName = '';
  passwordErrorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private helperService: HelperService) { }

  signup() {
    this.authService.register(this.fullName, this.email, this.password).subscribe({
      next: (space) => {
        console.log('Space created successfully:', space);
        this.router.navigate(['/email-confirmation-message']);
      },
      error: (error) => {
        if (error.status === 400) {
          this.toastrService.error('Dados inválidos ou já cadastrados!');
          return;
        }
        this.toastrService.error('Ocorreu um erro ao realizar seu cadastro!');
      }
    });
  }

  isValidPassword(password: string): boolean {
    const passwordValidation = this.helperService.isValidPassword(password);
    this.passwordErrorMessage = passwordValidation.errorMessage;

    return passwordValidation.isValid;
  }

  isValidEmail(userEmail: string): boolean {
    return this.helperService.isValidEmail(userEmail);
  }

  isValidFullName(fullName: string): boolean {
    if (!fullName || fullName.trim() === '' || fullName.length < 3) {
      return false;
    }
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return nameRegex.test(fullName);
  }
}
