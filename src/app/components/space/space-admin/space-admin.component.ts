import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceService } from '../../../services/space/space.service';

@Component({
  selector: 'app-space-admin',
  standalone: true,
  imports: [],
  templateUrl: './space-admin.component.html',
  styleUrl: './space-admin.component.scss'
})
export class SpaceAdminComponent implements OnInit {

  adminToken: string = '';
  spaceName: string = '';
  publicToken: string = '';
  imageQrCode: string = 'https://lncimg.lance.com.br/cdn-cgi/image/width=850,quality=75,format=webp/uploads/2024/09/escudo-palmeiras.jpg';

  constructor(private route: ActivatedRoute, private spaceService: SpaceService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.adminToken = params.get('id')!.toString();
      console.log(this.adminToken);
    });

    this.spaceService.getAdminSpace(this.adminToken).subscribe(space => {
      console.log(space);
      this.spaceName = space.name;
      this.publicToken = space.publicToken;
      this.imageQrCode = `https://lncimg.lance.com.br/cdn-cgi/image/width=850,quality=75,format=webp/uploads/2024/09/escudo-palmeiras.jpg`;
    });
  }

}
