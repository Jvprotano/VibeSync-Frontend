import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

  signup() {
    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/signin']).then(() => {
          this.toastrService.success('Usuário cadastrado com sucesso!', 'Realize o login para continuar!');
        });
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
}
