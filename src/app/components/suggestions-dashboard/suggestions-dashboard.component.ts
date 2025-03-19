import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SuggestionService } from '../../services/suggestion/suggestion.service';
import { Suggestion } from '../../models/suggestion-model';
import { SpaceService } from '../../services/space/space.service';
import { ToastrService } from 'ngx-toastr';
import { DateService } from '../../services/date/date.service';

@Component({
  selector: 'app-suggestions-dashboard',
  templateUrl: './suggestions-dashboard.component.html',
  styleUrl: './suggestions-dashboard.component.scss',
  standalone: false
})

export class SuggestionsDashboardComponent implements OnInit {
  spaceName: string = '';
  isLoading: boolean = true;
  adminToken: string = '';

  allSuggestions: Suggestion[] = [];
  suggestionsLast5Minutes: Suggestion[] = [];
  suggestionsLast10Minutes: Suggestion[] = [];
  suggestionsLast30Minutes: Suggestion[] = [];
  suggestionsLast60Minutes: Suggestion[] = [];

  quantitiesPerPage: any[] = [10, 30, 50, 100];
  quantityPerPage: number = 10;

  lastUpdated: Date = new Date();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private spaceService: SpaceService,
    private toastrService: ToastrService,
    private dateService: DateService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
    });

    this.updateSuggestions();
    setInterval(() => {
      this.updateSuggestions();
    }, 15000);

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

  changeQuantityPerPage(quantity: number) {
    this.quantityPerPage = quantity;
    this.updateSuggestions();
  }

  updateSuggestions() {
    this.isLoading = true;

    this.getSuggestions(0);
    this.getSuggestions(5);
    this.getSuggestions(10);
    this.getSuggestions(30);
    this.getSuggestions(60);

    this.lastUpdated = new Date();
    this.isLoading = false;
  }

  getSuggestions(minutes: number) {

    var startDate = '';
    var dataAtual = this.dateService.getFormatedCurrentDateTime();

    if (minutes == 0)
      startDate = this.dateService.generateDateTimeString(99999099);
    else
      startDate = this.dateService.generateDateTimeString(minutes);

    this.suggestionService.getSuggestions(this.adminToken, this.quantityPerPage, startDate, dataAtual).subscribe(suggestions => {
      this.updateListByMinutes(minutes, suggestions);
    });
  }

  updateListByMinutes(minutes: number, suggestions: Suggestion[]) {
    switch (minutes) {
      case 5:
        this.suggestionsLast5Minutes = suggestions;
        break;
      case 10:
        this.suggestionsLast10Minutes = suggestions;
        break;
      case 30:
        this.suggestionsLast30Minutes = suggestions;
        break;
      case 60:
        this.suggestionsLast60Minutes = suggestions;
        break;
      case 0:
        this.allSuggestions = suggestions;
        break;
    }
  }
}