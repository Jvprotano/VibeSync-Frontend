import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends BaseService {

  private apiUrl = environment.apiUrl + '/payment';

  getCheckoutUrl(planId: string): Observable<Payment> {
    return this.postAuth<Payment>(`${this.apiUrl}/create-checkout-session`, { planId });
  }
}