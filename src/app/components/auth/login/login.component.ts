import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationStateService } from '../../../services/navigation-state.service';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private navigationStateService: NavigationStateService,
    private paymentService: PaymentService) { }

  login() {
    if (!this.email || !this.password) {
      this.toastrService.error('Por favor, preencha todos os campos.', 'Campos obrigatórios');
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.handlePostLoginRedirect();

      },
      error: () => {
        this.toastrService.error('Usuário não encontrado!', 'Ocorreu um erro ao entrar.');
      }
    });
  }

  private handlePostLoginRedirect() {
    const pendingAction = this.navigationStateService.getAndClearPostLoginAction();

    switch (pendingAction?.type) {
      case 'buyPlan':
        const planId = pendingAction.payload;

        this.paymentService.initiateCheckoutAndRedirect(
          planId as string,
          'Login realizado! Redirecionando para o checkout...'
        );
        break;
      case 'createSpace':
        this.router.navigate(['/create-space']).then(() => {
          this.toastrService.success('Usuário confirmado com sucesso! Agora você pode criar seu Space.');
        });
        break;
      default: this.router.navigate(['/user-spaces']);
    }
  }
}
