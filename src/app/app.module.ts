import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateSpaceComponent } from './components/space/create-space/create-space.component';
import { SpaceDetailsComponent } from './components/space/space-details/space-details.component';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { LoadingComponent } from './components/loading/loading.component';
import { SpaceAdminComponent } from './components/space/space-admin/space-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SuggestionsDashboardComponent } from './components/suggestions-dashboard/suggestions-dashboard.component';
import { SuggestionsTableComponent } from './components/suggestions-table/suggestions-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ShareWhatsappButtonComponent } from './components/share-whatsapp-button/share-whatsapp-button.component';
import { DateService } from './services/date.service';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserSpacesComponent } from './components/user/user-spaces/user-spaces.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentErrorComponent } from './components/payment/payment-error/payment-error.component';
import { PaymentSuccessComponent } from './components/payment/payment-success/payment-success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { InviteCardComponent } from './components/invite/invite-card.component';

@NgModule({
    declarations: [
        AppComponent,
        CreateSpaceComponent,
        SpaceDetailsComponent,
        SpaceAdminComponent,
        HomeComponent,
        LoadingComponent,
        SuggestionsDashboardComponent,
        SuggestionsTableComponent,
        ShareWhatsappButtonComponent,
        PricingComponent,
        LoginComponent,
        RegisterComponent,
        UserSpacesComponent,
        PageNotFoundComponent,
        PaymentErrorComponent,
        PaymentSuccessComponent,
        InviteCardComponent,
    ],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        MatTooltipModule,
        NgbModule,
        HeaderComponent,
        FooterComponent
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync(),
        DateService]
})
export class AppModule { }