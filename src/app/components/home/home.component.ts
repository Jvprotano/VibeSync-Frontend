import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NavigationStateService } from "../../services/navigation-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private navigationStateService: NavigationStateService,
  ) { }

  showPublicSpace: boolean = false;
  spaceToken: string = '';

  @ViewChild('howItWorksSection') howItWorksSection?: ElementRef;

  scrollToHowItWorks() {
    this.howItWorksSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  CreateSpace() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/create-space']);
    } else {
      this.navigationStateService.setPostLoginAction({ type: 'createSpace', payload: null });
      this.router.navigate(['/signup']);
    }
  }
}