import { Component } from '@angular/core';
import { Space } from '../../../models/space.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-user-spaces',
  standalone: false,
  templateUrl: './user-spaces.component.html',
  styleUrl: './user-spaces.component.scss'
})
export class UserSpacesComponent {

  constructor(private spaceService: SpaceService, private toastrService: ToastrService, private router: Router) { };
  spaces: Space[] = [];

  ngOnInit() {
    this.spaceService.getUserSpaces().subscribe({
      next: (spaces) => {
        this.spaces = spaces;
      },
      error: (error) => {
        this.toastrService.error('Ocorreu um erro ao buscar os spaces!');
      }
    });
  }

  createSpace() {
    this.router.navigate(['/create-space']);
  }

  navigateToSpace(spaceAdminToken: string) {
    this.router.navigate(['/space-admin', spaceAdminToken]);
  }
}