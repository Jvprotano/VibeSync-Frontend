import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SuggestionService } from '../../services/suggestion/suggestion.service';
import { Suggestion } from '../../models/suggestion-model';
import { SpaceService } from '../../services/space/space.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suggestions-dashboard',
  templateUrl: './suggestions-dashboard.component.html',
  styleUrl: './suggestions-dashboard.component.scss',
  standalone: false
})

export class SuggestionsDashboardComponent implements OnInit {
  spaceName: string = 'Space Name';
  isLoading: boolean = true;
  adminToken: string = '';

  suggestionsLast30Minutes: Suggestion[] = [];
  suggestionsLast60Minutes: Suggestion[] = [];
  suggestionsLast5Minutes: Suggestion[] = [];
  suggestionsLast10Minutes: Suggestion[] = [];
  allSuggestions: Suggestion[] = [];

  lastUpdated: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private spaceService: SpaceService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
    });

    this.updateSuggestions();
    setInterval(() => {
      this.updateSuggestions();
    }, 10000);

    this.spaceService.getAdminSpace(this.adminToken).subscribe({
      next: (space) => {
        this.spaceName = space.name;
        this.isLoading = false;
      },
      error: () => {
        this.router.navigate(['home']).then(() => {
          this.toastrService.error('Space selecionado não encontrado', 'Ocorreu um erro!');
        });
      }
    });

    this.isLoading = false;
  }

  voltar() {
    this.router.navigate(['/space-admin/' + this.adminToken]);
  }

  updateSuggestions() {
    this.isLoading = true;

    var dataAtual = this.getFormatedCurrentDateTime();
    var minData = this.generateDateTimeString(99999099);

    this.suggestionService.getSuggestions(this.adminToken, 10, this.generateDateTimeString(30), dataAtual).subscribe(suggestions => {
      this.suggestionsLast30Minutes = suggestions;
    });

    this.suggestionService.getSuggestions(this.adminToken, 10, this.generateDateTimeString(60), dataAtual).subscribe(suggestions => {
      this.suggestionsLast60Minutes = suggestions;
    });

    this.suggestionService.getSuggestions(this.adminToken, 10, this.generateDateTimeString(5), dataAtual).subscribe(suggestions => {
      this.suggestionsLast5Minutes = suggestions;
    });

    this.suggestionService.getSuggestions(this.adminToken, 10, this.generateDateTimeString(10), dataAtual).subscribe(suggestions => {
      this.suggestionsLast10Minutes = suggestions;
    });

    this.suggestionService.getSuggestions(this.adminToken, 10, minData, dataAtual).subscribe(suggestions => {
      this.allSuggestions = suggestions;
    });

    this.lastUpdated = new Date();
    this.isLoading = false;
  }

  generateDateTimeString(minutesAgo: number) {
    var date = new Date();
    date.setMinutes(date.getMinutes() - minutesAgo);

    const dataFormatada = date.toLocaleDateString('en-CA', { // Formato AAAA-MM-DD
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const horaFormatada = date.toLocaleTimeString('en-CA', { // Formato HH:MM
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato 24 horas
    });

    return `${dataFormatada} ${horaFormatada}`;
  }

  getFormatedCurrentDateTime() {
    const dataAtual = new Date();

    const dataFormatada = dataAtual.toLocaleDateString('en-CA', { // Formato AAAA-MM-DD
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    const horaFormatada = dataAtual.toLocaleTimeString('en-CA', { // Formato HH:MM
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Formato 24 horas
    });

    return `${dataFormatada} ${horaFormatada}`;
  }
}