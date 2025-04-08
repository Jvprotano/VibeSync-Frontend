import { HomeComponent } from './components/home/home.component';
import { CreateSpaceComponent } from './components/space/create-space/create-space.component';
import { SpaceDetailsComponent } from './components/space/space-details/space-details.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-space', component: CreateSpaceComponent },
  { path: 'space/:id', component: SpaceDetailsComponent },
  { path: 'space-admin/:id', component: SpaceAdminComponent },
  { path: 'suggestions/:id', component: SuggestionsDashboardComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'signin', component: LoginComponent, canActivate: [!AuthGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [!AuthGuard] },
  { path: 'user-spaces', component: UserSpacesComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }