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
  userEmail: string = '';
  showSpaceLimitModal: boolean = false;

  constructor(private spaceService: SpaceService, private router: Router, private toastrService: ToastrService) { }

  createSpace() {
    if (!this.isValid(this.spaceName)) {
      this.toastrService.error('Por favor, insira um nome para o Space.');
      return;
    }

    this.spaceService.createSpace(this.spaceName, this.userEmail).subscribe({
      next: (space) => {
        this.toastrService.success('Space criado com sucesso!');
        this.router.navigate(['/space-admin', space.adminToken]);
      },
      error: (error) => {
        console.error('Erro ao criar o Space:', error); // Use console.error para erros
        if (error.status === 429) {
          this.showSpaceLimitPerUserModal();
        } else {
          this.toastrService.error('Ocorreu um erro ao criar o Space. Por favor, tente novamente mais tarde.');
        }
      }
    });
  }

  isValid(spaceName: string): boolean {
    return !!spaceName && spaceName.trim().length >= 3; // Simplificação da lógica
  }

  isValidEmail(userEmail: string): boolean {
    if (!userEmail || userEmail.trim() === '') {
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(userEmail);
  }

  showSpaceLimitPerUserModal() {
    this.showSpaceLimitModal = true;
  }

  closeSpaceLimitModal() {
    this.showSpaceLimitModal = false;
  }
}