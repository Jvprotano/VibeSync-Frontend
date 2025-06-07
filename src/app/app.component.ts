import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><app-mobile-navbar></app-mobile-navbar>',
  standalone: false
})
export class AppComponent {
  title = 'vibesync-frontend';
}