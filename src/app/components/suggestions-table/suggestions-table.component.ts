import { Component, Input } from '@angular/core';
import { Suggestion } from '../../models/suggestion.model';

@Component({
  selector: 'app-suggestions-table',
  standalone: false,
  templateUrl: './suggestions-table.component.html',
  styleUrl: './suggestions-table.component.scss'
})

export class SuggestionsTableComponent {

  @Input() title: string = '';
  @Input() suggestions: Suggestion[] = [];

  openSuggestion(url: string) {
    window.open(url, '_blank');
  }
}
