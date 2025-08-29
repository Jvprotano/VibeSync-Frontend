import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss'],
  imports: [TranslateModule],
  standalone: true
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const tokenFromUrl = params.get('token');
      const userIdFromUrl = params.get('userId');

      if (tokenFromUrl && userIdFromUrl) {

        this.authService.confirmUser(userIdFromUrl, tokenFromUrl).subscribe({
          next: () => {
            this.router.navigate(['/login']).then(() => {
              this.toastr.success(this.translate.instant('auth.emailConfirmation.success'));
            });
          },
          error: (error) => {
            console.error('Email confirmation error:', error);
            if (error.status === 400) {
              this.toastr.error(error.error?.message || this.translate.instant('auth.emailConfirmation.errors.invalidToken'));
            } else if (error.status === 404 && error.error?.message.includes("User not found")) {
              this.toastr.error(this.translate.instant('auth.emailConfirmation.errors.userNotFound'));
            }
            else {
              this.toastr.error(this.translate.instant('auth.emailConfirmation.errors.generic'));
            }
            this.router.navigate(['/login']);
          }
        });
      } else {
        console.error('Token e/ou UserId não encontrados na URL');
        this.toastr.error(this.translate.instant('auth.emailConfirmation.errors.invalidLink'));
        this.router.navigate(['/login']);
      }
    });
  }
}