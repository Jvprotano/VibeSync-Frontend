import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
    standalone: false,
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
    email = '';
    loading = false;

    constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

    submit() {
        if (!this.email) {
            this.toastr.error('Por favor, informe seu e-mail.');
            return;
        }
        this.loading = true;
        this.authService.forgotPassword(this.email).subscribe({
            next: () => {
                this.toastr.success('Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.');
                this.router.navigate(['/login']);
            },
            error: () => {
                this.toastr.error('Erro ao solicitar redefinição de senha.');
                this.loading = false;
            }
        });
    }
}
