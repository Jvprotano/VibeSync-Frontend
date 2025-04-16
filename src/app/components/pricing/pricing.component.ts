import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService) { }

  buyPlan(planId: string) {

    this.paymentService.getCheckoutUrl(planId).subscribe({
      next: (response) => {
        this.toastrService.success('Redirecionando para o checkout...');
        window.location.href = response.checkoutUrl;
      },
      error: (error) => {
        this.toastrService.error('Ocorreu um erro ao processar gerar o pagamento!');
        console.error('Erro ao gerar o pagamento:', error);
      }
    });
  }

  faqs = [
    {
      question: 'Como funciona o teste gratuito?',
      answer: 'Você pode experimentar qualquer plano pago gratuitamente por 7 dias.',
      expanded: false
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura quando quiser.',
      expanded: false
    },
  ];

}
