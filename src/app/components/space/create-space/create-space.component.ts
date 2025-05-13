import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpaceService } from '../../../services/space.service';
import { AuthService } from '../../../services/auth.service';
import { HelperService } from '../../../services/helper.service';

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
    private toastrService: ToastrService,
    private authService: AuthService,
    private helperService: HelperService) { }

  createSpace() {
    debugger
    if (!this.isValidSpaceName(this.spaceName)) {
      this.toastrService.error('Por favor, insira um nome para o Space.');
      return;
    }

    if (!this.isValidEventDate()) {
      this.toastrService.error('Por favor, insira uma data válida para o evento.');
      return;
    }

    if (!this.userIsAuthenticated()) {
      if (!this.isValidUserCreation()) {
        this.toastrService.error('Por favor, preencha todos os campos de cadastro corretamente.');
        return;
      }

      this.createUserAndGenerateSpace();
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

  private createUserAndGenerateSpace() {
    this.authService.register(this.fullName, this.userEmail, this.password).subscribe({
      next: () => {
        this.authService.login(this.userEmail, this.password).subscribe({
          next: (response) => {
            this.createSpaceRequest();
          },
          error: (error) => {
            console.error('Erro ao logar o usuário:', error);
            this.toastrService.error('Ocorreu um erro ao logar o usuário. Por favor, tente novamente mais tarde.');
            return;
          }
        });
      },
      error: (error) => {
        console.error('Erro ao criar o usuário:', error);
        this.toastrService.error('Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.');
        return;
      }
    });
  }

  showSpaceLimitPerUserModal() {
    this.showSpaceLimitModal = true;
  }

  closeSpaceLimitModal() {
    this.showSpaceLimitModal = false;
  }

  userIsAuthenticated(): boolean {
    if (this.flagUserAuthenticated == null) {
      this.flagUserAuthenticated = this.authService.isAuthenticated();
    }

    return this.flagUserAuthenticated;
  }

  isValidPassword(password: string): boolean {
    const passwordValidation = this.helperService.isValidPassword(password);
    this.passwordErrorMessage = passwordValidation.errorMessage;

    return passwordValidation.isValid;
  }

  isValidEventDate() {
    if (!this.eventDate) {
      return false;
    }

    const currentDate = new Date();
    const eventDate = new Date(this.eventDate);

    currentDate.setHours(0, 0, 0, 0);

    return eventDate > currentDate;
  }

  isValidSpaceName(spaceName: string): boolean {
    return !!spaceName && spaceName.trim().length >= 3;
  }

  isValidUserCreation(): boolean {
    return this.isValidEmail(this.userEmail) &&
      this.isValidPassword(this.password) &&
      this.password === this.confirmPassword;
  }

  isValidEmail(userEmail: string): boolean {
    return this.helperService.isValidEmail(userEmail);
  }

  isValidFullName(fullName: string): boolean {
    if (!fullName || fullName.trim() === '' || fullName.length < 3) {
      return false;
    }
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    return nameRegex.test(fullName);
  }
}