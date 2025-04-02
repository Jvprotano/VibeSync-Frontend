import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; // Importe o AppComponent
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
import { DateService } from './services/date/date.service';
import { PricingComponent } from './components/pricing/pricing.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserSpacesComponent } from './components/user/user-spaces/user-spaces.component';

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
        UserSpacesComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        ToastrModule.forRoot(),
        MatProgressSpinnerModule,
        MatTooltipModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync(), DateService]
})
export class AppModule { }