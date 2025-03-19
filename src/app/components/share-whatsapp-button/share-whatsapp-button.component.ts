import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-share-whatsapp-button',
  standalone: false,
  templateUrl: './share-whatsapp-button.component.html',
  styleUrl: './share-whatsapp-button.component.scss'
})
export class ShareWhatsappButtonComponent {
  @Input() spaceName: string = '';
  @Input() publicToken: string = '';

  publicLink: string = 'http://localhost:4200/space/';

  shareOnWhatsApp() {
    const message = `Venha participar da festa - "${this.spaceName}" com VibeSync
    ${this.publicLink + this.publicToken}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
