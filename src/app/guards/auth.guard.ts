import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      console.log('Usuário autenticado, acesso permitido.');
      return true;
    } else {
      this.router.navigate(['/signin']).then(() => {
        console.log('Usuário não autenticado, redirecionando para a página de login.');
        this.toastrService.error('Você precisa estar logado para acessar esta página.', 'Acesso Negado');
      });

      return false;
    }
  }

}
