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
    this.spaceService.createSpace(this.spaceName).subscribe({
      next: (space) => {
        this.toastrService.success('Espaço criado com sucesso!');
        this.router.navigate(['/space-admin', space.adminToken]);
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Ocorreu um erro ao criar o espaço. Por favor, tente novamente mais tarde.');
      }
    });
  }
}