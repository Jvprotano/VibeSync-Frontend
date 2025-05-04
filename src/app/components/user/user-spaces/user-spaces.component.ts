import { Component } from '@angular/core';
import { Space } from '../../../models/space.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpaceService } from '../../../services/space.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-spaces',
  standalone: false,
  templateUrl: './user-spaces.component.html',
  styleUrl: './user-spaces.component.scss'
})
export class UserSpacesComponent {

  constructor(
    private spaceService: SpaceService,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService) { };

  spaces: Space[] = [];
  user: User | null = null;

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