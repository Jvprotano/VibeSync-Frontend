import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NavigationStateService } from '../../services/navigation-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private navigationStateService: NavigationStateService,
    private router: Router) { }

  buyPlan(planId: string) {

    if (this.authService.isAuthenticated()) {
      this.paymentService.initiateCheckoutAndRedirect(planId);
    } else {
      this.navigationStateService.setPostLoginAction({ type: 'buyPlan', payload: planId });
      this.toastrService.info('Você precisa estar logado para comprar um plano. Redirecionando para o login...');
      this.router.navigate(['/login']);
    }
  }

  faqs = [
    // {
    //   question: 'Como funciona o teste gratuito?',
    //   answer: 'Você pode experimentar qualquer plano pago gratuitamente por 7 dias.',
    //   expanded: false
    // },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura quando quiser.',
      expanded: true
    },
  ];

}
