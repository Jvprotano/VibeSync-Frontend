import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() user: User | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router, private viewportScroller: ViewportScroller) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  goToFragment() {
    this.router.navigate(['/'], { fragment: 'how-it-works' }).then(() => {
      // Dá um tempo para o DOM carregar (se necessário)
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor('how-it-works');
      }, 100);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
