import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-share-whatsapp-button',
  standalone: false,
  templateUrl: './share-whatsapp-button.component.html',
  styleUrl: './share-whatsapp-button.component.scss'
})
export class ShareWhatsappButtonComponent {
  @Input() spaceName: string = '';
  @Input() publicToken: string = '';

  publicLink: string = environment.baseUrl + '/space/';

  shareOnWhatsApp() {
    const message = `Faça parte do evento - "${this.spaceName}" com VibeSync \n Acesse o link abaixo e selecione as músicas que você quer ouvir: \n
    ${this.publicLink + this.publicToken}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

}
