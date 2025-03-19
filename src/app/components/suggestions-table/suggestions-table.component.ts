import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggestions-table',
  standalone: false,
  templateUrl: './suggestions-table.component.html',
  styleUrl: './suggestions-table.component.scss'
})

export class SuggestionsTableComponent {
  @Input() title: string = '';
  @Input() suggestions: any[] = [];
}
