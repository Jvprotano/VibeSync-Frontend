import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Suggestion } from '../../../models/suggestion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions-mobile',
  templateUrl: './suggestions-mobile.component.html',
  styleUrl: './suggestions-mobile.component.scss',
  standalone: false
})
export class SuggestionsMobileComponent {

  @Input()
  spaceName: string = '';
  @Input()
  spaceToken: string = '';
  @Input()
  isLoading: boolean = true;
  @Input()
  adminToken: string = '';
  @Input()
  allSuggestions: Suggestion[] = [];
  @Input()
  suggestionsLast5Minutes: Suggestion[] = [];
  @Input()
  suggestionsLast10Minutes: Suggestion[] = [];
  @Input()
  suggestionsLast30Minutes: Suggestion[] = [];
  @Input()
  suggestionsLast60Minutes: Suggestion[] = [];
  @Input()
  quantitiesPerPage: any[] = [10, 30, 50, 100];
  @Input()
  quantityPerPage: number = 10;
  @Input()
  lastUpdated: Date = new Date();

  activeSuggestions: number = 0;

  @Output()
  changeQuantity = new EventEmitter<any>()

  timeFilters = ['Últimos 5min', 'Últimos 10min', 'Últimos 30min', 'Última hora', 'Evento Inteiro'];
  stats = {
    activeListeners: 247,
    totalRequests: 1432,
    avgWaitTime: '3:42',
    uniqueSongs: 89
  };

  constructor(private router: Router) { }

  get getSuggestions(): Suggestion[] {
    switch (this.activeSuggestions) {
      case 0:
        return this.suggestionsLast5Minutes;
      case 1:
        return this.suggestionsLast10Minutes;
      case 2:
        return this.suggestionsLast30Minutes;
      case 3:
        return this.suggestionsLast60Minutes;
      case 4:
        return this.allSuggestions;
      default:
        return this.allSuggestions;
    }
  }

  changeQuantityPerPage(quantity: number) {
    this.quantityPerPage = quantity;
    this.changeQuantity.emit(quantity);
  }

  voltar() {
    this.router.navigate(['/space-admin/' + this.adminToken]);
  }

  filterByTime(index: number): void {
    this.activeSuggestions = index;
  }

  share() {
    window.navigator.share({ title: 'Participe do Space ' + this.spaceName, text: 'Venha sugerir músicas no Space ' + this.spaceName + '!', url: window.location.origin + '/space/' + this.spaceToken });
  }
}
