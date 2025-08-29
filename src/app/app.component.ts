import { Component } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet><app-mobile-navbar></app-mobile-navbar>',
  standalone: false
})
export class AppComponent {
  title = 'vibesync-frontend';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt');
    translate.use('pt');

    // Add languages
    translate.addLangs(['pt', 'en', 'es']);

    // Get browser language
    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      const lang = browserLang.match(/pt|en|es/) ? browserLang : 'pt';
      translate.use(lang);
    }
  }
}