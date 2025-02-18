import { ActivatedRoute, Router } from '@angular/router';
import { SpaceService } from '../../../services/space/space.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Space } from '../../../models/space-model';

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
  imageQrCode: string = 'https://lncimg.lance.com.br/cdn-cgi/image/width=850,quality=75,format=webp/uploads/2024/09/escudo-palmeiras.jpg';
  isLoading: boolean = true;

  publicLink: string = '';
  adminLink: string = '';

  constructor(private route: ActivatedRoute, private spaceService: SpaceService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
      this.adminLink = `http://localhost:4200/space-admin/${this.adminToken}`; // Define o link admin
      this.publicLink = `http://localhost:4200/space/${this.adminToken}`; // Define o link público
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
    this.router.navigate(['/home']);
  }

  painelSugestoes() {
    this.router.navigate(['/suggestions', this.adminToken]);
  }

  fillFields(space: Space) {
    this.spaceName = space.name;
    this.publicToken = space.publicToken;
    this.imageQrCode = 'data:image/png;base64,' + space.qrCode;
  }
}