import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
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

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
