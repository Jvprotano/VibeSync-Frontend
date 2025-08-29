import { HomeComponent } from './components/home/home.component';
import { CreateSpaceComponent } from './components/space/create-space/create-space.component';
import { SpaceAdminComponent } from './components/space/space-admin/space-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SuggestionsDashboardComponent } from './components/suggestions-dashboard/suggestions-dashboard.component';
import { PricingComponent as PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserSpacesComponent } from './components/user/user-spaces/user-spaces.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { GuestGuard } from './guards/guest.guard';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { PaymentErrorComponent } from './components/payment/payment-error/payment-error.component';
import { EmailConfirmationMessageComponent } from './components/auth/email-confirmation-message/email-confirmation-message.component';
import { EmailConfirmationComponent } from './components/auth/email-confirmation/email-confirmation.component';
import { SpaceSuggestComponent } from './components/space/space-suggest/space-suggest.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-space', component: CreateSpaceComponent },
  { path: 'space/:id', component: SpaceSuggestComponent },
  { path: 'space-admin/:id', component: SpaceAdminComponent },
  { path: 'suggestions/:id', component: SuggestionsDashboardComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'success', component: PaymentSuccessComponent },
  { path: 'payment-error', component: PaymentErrorComponent },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'user-spaces', component: UserSpacesComponent, canActivate: [AuthGuard] },
  { path: 'email-confirmation-message', component: EmailConfirmationMessageComponent, canActivate: [GuestGuard] },
  { path: 'email-confirmation', component: EmailConfirmationComponent, canActivate: [GuestGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }