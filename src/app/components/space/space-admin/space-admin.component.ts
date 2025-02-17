import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpaceService } from '../../../services/space/space.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-space-admin',
  templateUrl: './space-admin.component.html',
  styleUrl: './space-admin.component.scss'
})
export class SpaceAdminComponent implements OnInit {

  adminToken: string = '';
  spaceName: string = '';
  publicToken: string = '';
  imageQrCode: string = 'https://lncimg.lance.com.br/cdn-cgi/image/width=850,quality=75,format=webp/uploads/2024/09/escudo-palmeiras.jpg';
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private spaceService: SpaceService, private toastrService: ToastrService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
    });

    this.spaceService.getAdminSpace(this.adminToken).subscribe(space => {
      console.log(space);
      this.spaceName = space.name;
      this.publicToken = space.publicToken;
      this.imageQrCode = 'data:image/png;base64,' + space.qrCode;
      this.isLoading = false;
    },
      () => {
        this.router.navigate(['home']).then(() => {
          this.toastrService.error('Space selecionado não encontrado', 'Ocorreu um erro!');
        })
      }
    );
  }
}