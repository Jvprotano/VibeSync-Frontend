import { Component } from '@angular/core';
import { SpaceService } from '../../../services/space/space.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.scss'],
  standalone: false
})
export class CreateSpaceComponent {
  spaceName: string = '';

  constructor(private spaceService: SpaceService, private router: Router) { }

  createSpace() {
    this.spaceService.createSpace(this.spaceName).subscribe(space => {
      this.router.navigate(['/space-admin', space.id]);
    });
  }
}