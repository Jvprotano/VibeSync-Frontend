import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: false,
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent {
  sessionId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.sessionId = params.get('session_id'); // Obtém o ID da rota
    });
  }

  goToUserSpaces() {
    this.router.navigate(['/user-spaces']);
  }
}