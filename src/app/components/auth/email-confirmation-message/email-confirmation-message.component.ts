import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-email-confirmation-message',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './email-confirmation-message.component.html',
  styleUrl: './email-confirmation-message.component.scss'
})
export class EmailConfirmationMessageComponent {

}
