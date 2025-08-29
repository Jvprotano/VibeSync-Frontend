import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
    standalone: false,
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    email = '';
    token = '';
    newPassword = '';
    confirmPassword = '';
    loading = false;

    constructor(private route: ActivatedRoute, private authService: AuthService, private toastr: ToastrService, private router: Router) {
        this.route.queryParamMap.subscribe(params => {
            this.email = params.get('email') || '';
            this.token = params.get('token') || '';
        });
    }

    submit() {
        if (!this.newPassword || !this.confirmPassword) {
            this.toastr.error('Preencha todos os campos.');
            return;
        }
        if (this.newPassword !== this.confirmPassword) {
            this.toastr.error('As senhas não coincidem.');
            return;
        }
        this.loading = true;
        this.authService.resetPassword(this.email, this.token, this.newPassword).subscribe({
            next: () => {
                this.toastr.success('Senha redefinida com sucesso!');
                this.router.navigate(['/login']);
            },
            error: () => {
                this.toastr.error('Erro ao redefinir a senha.');
                this.loading = false;
            }
        });
    }
}
