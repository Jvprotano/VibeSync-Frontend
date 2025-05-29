import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const tokenFromUrl = params.get('token');
      const userIdFromUrl = params.get('userId');

      if (tokenFromUrl && userIdFromUrl) {

        this.authService.confirmUser(userIdFromUrl, tokenFromUrl).subscribe({
          next: () => {
            this.router.navigate(['/login']).then(() => {
              this.toastr.success('E-mail confirmado com sucesso! Agora você pode fazer login.');
            });
          },
          error: (error) => {
            console.error('Email confirmation error:', error);
            if (error.status === 400) {
              this.toastr.error(error.error?.message || 'Token inválido, expirado ou já utilizado.');
            } else if (error.status === 404 && error.error?.message.includes("User not found")) {
              this.toastr.error('Usuário não encontrado.');
            }
            else {
              this.toastr.error('Ocorreu um erro ao confirmar o e-mail. Tente novamente mais tarde.');
            }
            this.router.navigate(['/login']);
          }
        });
      } else {
        console.error('Token e/ou UserId não encontrados na URL');
        this.toastr.error('Link de confirmação inválido ou incompleto.');
        this.router.navigate(['/login']);
      }
    });
  }
}