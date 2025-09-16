import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationStateService } from '../../../services/navigation-state.service';
import { PaymentService } from '../../../services/payment.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private navigationStateService: NavigationStateService,
    private paymentService: PaymentService,
    private translate: TranslateService) { }

  login() {
    this.isLoading = true;
    if (!this.email || !this.password) {
      this.toastrService.error(
        this.translate.instant('auth.validation.fillAllFields'),
        this.translate.instant('auth.validation.requiredFields')
      );
      this.isLoading = false;
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.handlePostLoginRedirect();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastrService.error(
          this.translate.instant('auth.validation.userNotFound'),
          this.translate.instant('auth.validation.loginError')
        );
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