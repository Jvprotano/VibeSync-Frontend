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

    if (pendingAction && pendingAction.type === 'buyPlan') {
      const planId = pendingAction.payload;

      this.paymentService.initiateCheckoutAndRedirect(
        planId,
        'Login realizado! Redirecionando para o checkout...'
      );
    } else {
      this.router.navigate(['/user-spaces']);
    }
  }
}
