import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent {

  constructor(private router: Router) { }

  showAdminSpace: boolean = false;
  showPublicSpace: boolean = false;
  spaceToken: string = '';

  @ViewChild('howItWorksSection') howItWorksSection?: ElementRef;

  scrollToHowItWorks() {
    this.howItWorksSection?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  joinSpace() {
    if (this.showAdminSpace) {
      this.router.navigate(['/space-admin', this.spaceToken]);
    }
    else if (this.showPublicSpace) {
      this.router.navigate(['/space', this.spaceToken]);
    }
  }

}