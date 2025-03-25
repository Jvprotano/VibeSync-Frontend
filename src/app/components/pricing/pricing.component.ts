import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {

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
    // Adicione mais perguntas e respostas aqui
  ];

}
