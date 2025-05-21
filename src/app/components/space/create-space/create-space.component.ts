import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.scss'],
  standalone: false
})
export class CreateSpaceComponent {
  spaceName: string = '';
  eventDate: Date | null = null;

  userEmail: string = '';
  fullName = '';
  password = '';
  confirmPassword = '';
  passwordErrorMessage = '';

  showSpaceLimitModal: boolean = false;
  flagUserAuthenticated: boolean | null = null;

  constructor(
    private spaceService: SpaceService,
    private router: Router,
    private toastrService: ToastrService) { }

  createSpace() {
    if (!this.isValidSpaceName(this.spaceName)) {
      this.toastrService.error('Por favor, insira um nome para o Space.');
      return;
    }

    if (!this.isValidEventDate()) {
      this.toastrService.error('Por favor, insira uma data válida para o evento.');
      return;
    }

    this.createSpaceRequest();
  }

  private createSpaceRequest() {
    this.spaceService.createSpace(this.spaceName, this.eventDate!).subscribe({
      next: (space) => {
        this.toastrService.success('Space criado com sucesso!');
        this.router.navigate(['/space-admin', space.adminToken]);
      },
      error: (error) => {
        console.error('Erro ao criar o Space:', error);
        if (error.status === 429) {
          this.showSpaceLimitPerUserModal();
        } else {
          this.toastrService.error('Ocorreu um erro ao criar o Space. Por favor, tente novamente mais tarde.');
        }
      }
    });
  }

  showSpaceLimitPerUserModal() {
    this.showSpaceLimitModal = true;
  }

  closeSpaceLimitModal() {
    this.showSpaceLimitModal = false;
  }

  isValidEventDate() {
    if (!this.eventDate) {
      return false;
    }

    const currentDate = new Date();
    const newEventDate = new Date(this.eventDate);

    currentDate.setHours(0, 0, 0, 0);

    return newEventDate >= currentDate;
  }

  isValidSpaceName(spaceName: string): boolean {
    return !!spaceName && spaceName.trim().length >= 3;
  }
}