import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Payment } from '../models/payment.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  private toastrService = inject(ToastrService);
  private router = inject(Router);

  getCheckoutUrl(planId: string): Observable<Payment> {
    return this.postAuth<Payment>(`/payment/create-checkout-session`, { planId });
  }

  initiateCheckoutAndRedirect(planId: string, successMessage: string = 'Redirecionando para o checkout...'): void {
    this.getCheckoutUrl(planId).subscribe({
      next: (response) => {
        if (response && response.checkoutUrl) {
          this.toastrService.success(successMessage);
          window.location.href = response.checkoutUrl;
        } else {
          console.error('Resposta do checkout inválida:', response);
          this.toastrService.error('Não foi possível obter o link de checkout. Tente novamente mais tarde.');
          this.router.navigate(['/pricing']);
        }
      },
      error: (error) => {
        console.error('Erro ao iniciar o checkout:', error);
        const specificError = error?.error?.message || error?.message || 'Ocorreu um erro ao processar seu pedido de pagamento.';
        this.toastrService.error(specificError);
        // this.router.navigate(['/pricing']);
      }
    });
  }
}