import { Component } from '@angular/core';
import { SpaceService } from '../../../services/space/space.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.scss'],
  standalone: false
})
export class CreateSpaceComponent {
  spaceName: string = '';

  constructor(private spaceService: SpaceService, private router: Router, private toastrService: ToastrService) { }

  createSpace() {
    if (!this.isValid(this.spaceName)) {
      this.toastrService.error('Por favor, insira um nome para o Space.');
      return;
    }

    this.spaceService.createSpace(this.spaceName).subscribe({
      next: (space) => {
        this.toastrService.success('Space criado com sucesso!');
        this.router.navigate(['/space-admin', space.adminToken]);
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Ocorreu um erro ao criar o Space. Por favor, tente novamente mais tarde.');
      }
    });
  }

  isValid(spaceName: string): boolean {
    if (!spaceName || spaceName.trim() === '' || spaceName.length < 3) {
      return false
    }
    return true;
  }
}

