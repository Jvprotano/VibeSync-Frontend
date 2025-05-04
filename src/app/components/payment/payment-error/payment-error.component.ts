import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-payment-error',
  standalone: false,
  templateUrl: './payment-error.component.html',
  styleUrl: './payment-error.component.scss'
})
export class PaymentErrorComponent implements OnInit, OnDestroy {

  countdown = 15;
  private countdownSubscription: Subscription | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  goToPricing(): void {
    this.router.navigate(['/pricing']);
    this.clearCountdown();
  }

  private startCountdown(): void {
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe(() => {
        this.countdown--;
        if (this.countdown === 0) {
          this.goToPricing();
        }
      });
  }

  private clearCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
      this.countdownSubscription = undefined;
    }
  }
}