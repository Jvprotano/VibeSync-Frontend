import { Component } from '@angular/core';
import { Space } from '../../../models/space.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpaceService } from '../../../services/space.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { SubscriptionService } from '../../../services/subscription.service';

@Component({
  selector: 'app-user-spaces',
  standalone: false,
  templateUrl: './user-spaces.component.html',
  styleUrl: './user-spaces.component.scss'
})
export class UserSpacesComponent {
  spaces: Space[] = [];
  user: User | null = null;
  cancelLoading = false;

  constructor(
    private spaceService: SpaceService,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit() {
    this.spaceService.getUserSpaces().subscribe({
      next: (spaces) => {
        this.spaces = spaces;
      },
      error: () => {
        this.toastrService.error('Ocorreu um erro ao buscar os spaces!');
      }
    });

    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  hasPaidPlan(): boolean {
    return !!(this.user?.plan?.name && this.user.plan.name.toLowerCase() !== 'freemium');
  }

  cancelSubscription() {
    if (this.cancelLoading) return;
    this.cancelLoading = true;
    this.subscriptionService.cancelSubscription().subscribe({
      next: (res: any) => {
        this.toastrService.success(
          res?.endDatePeriod
            ? `Assinatura cancelada. Você terá acesso até: ${new Date(res.endDatePeriod).toLocaleDateString('pt-BR')}`
            : 'Assinatura cancelada com sucesso.'
        );
        this.cancelLoading = false;
      },
      error: () => {
        this.toastrService.error('Erro ao cancelar assinatura.');
        this.cancelLoading = false;
      }
    });
  }

  canCreateSpaces() {
    if (!this.user) {
      return 0;
    }
    if (this.user?.plan?.maxSpaces && Number(this.user.plan.maxSpaces) > this.spaces.length) {
      return Number(this.user.plan.maxSpaces) - this.spaces.length;
    } else {
      return 0;
    }
  }

  createSpace() {
    this.router.navigate(['/create-space']);
  }

  navigateToSpace(spaceAdminToken: string) {
    this.router.navigate(['/space-admin', spaceAdminToken]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}