import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

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
  name = '';

  constructor(private authService: AuthService, private router: Router) { }

  signup() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => { this.router.navigate(['/home']); },
      error: (error) => console.error('Erro no login:', error)
    });
  }
}
