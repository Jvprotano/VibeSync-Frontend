import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { NavigationStateService } from '../../services/navigation-state.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    private router: Router,
    private translate: TranslateService) { }

  buyPlan(planId: string) {

    if (this.authService.isAuthenticated()) {
      this.paymentService.initiateCheckoutAndRedirect(planId);
    } else {
      this.navigationStateService.setPostLoginAction({ type: 'buyPlan', payload: planId });
      this.toastrService.info(this.translate.instant('common.messages.loginRequired'));
      this.router.navigate(['/login']);
    }
  }

  faqs = [
    {
      question: 'pricing.faq.questions.cancel.question',
      answer: 'pricing.faq.questions.cancel.answer',
      expanded: true
    }
  ];

}
