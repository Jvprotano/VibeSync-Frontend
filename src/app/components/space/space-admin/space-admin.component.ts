import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Space } from '../../../models/space.model';
import { environment } from '../../../../environments/environment';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-space-admin',
  templateUrl: './space-admin.component.html',
  styleUrl: './space-admin.component.scss',
  standalone: false
})
export class SpaceAdminComponent implements OnInit {

  adminToken: string = '';
  spaceName: string = '';
  publicToken: string = '';
  imageQrCode: string = '';
  isLoading: boolean = true;

  publicLink: string = '';
  adminLink: string = '';

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
      this.adminLink = environment.baseUrl + `/space-admin/${this.adminToken}`;
    });

    this.spaceService.getAdminSpace(this.adminToken).subscribe({
      next: (space) => {
        this.fillFields(space);
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['home']).then(() => {
          this.toastrService.error('Space selecionado não encontrado', 'Ocorreu um erro!');
        });
      }
    });
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.toastrService.success('Link copiado para a área de transferência!', 'Sucesso');
    }).catch(err => {
      this.toastrService.error('Não foi possível copiar o link!', 'Erro');
    });
  }

  voltar() {
    this.router.navigate(['/user-spaces']);
  }

  painelSugestoes() {
    this.router.navigate(['/suggestions', this.adminToken]);
  }

  fillFields(space: Space) {
    this.spaceName = space.name;
    this.publicToken = space.publicToken;
    this.imageQrCode = 'data:image/png;base64,' + space.qrCode;
    this.publicLink = environment.baseUrl + `/space/${this.publicToken}`;
  }
}