import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Suggestion } from '../../models/suggestion.model';
import { ToastrService } from 'ngx-toastr';
import { DateService } from '../../services/date.service';
import { SuggestionService } from '../../services/suggestion.service';
import { SpaceService } from '../../services/space.service';
import { SuggestionFilterTime as SuggestionFilterTimeEnum } from '../../enums/suggestion-filter-time.enum';

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

    this.getSuggestions(SuggestionFilterTimeEnum.AllTime);
    this.getSuggestions(SuggestionFilterTimeEnum.Last5Minutes);
    this.getSuggestions(SuggestionFilterTimeEnum.Last10Minutes);
    this.getSuggestions(SuggestionFilterTimeEnum.Last30Minutes);
    this.getSuggestions(SuggestionFilterTimeEnum.LastHour);

    this.lastUpdated = new Date();
    this.isLoading = false;
  }

  getSuggestions(filterTime: SuggestionFilterTimeEnum) {
    this.suggestionService.getSuggestions(this.adminToken, this.quantityPerPage, filterTime).subscribe(suggestions => {
      this.updateListByMinutes(filterTime, suggestions);
    });
  }

  updateListByMinutes(minutes: SuggestionFilterTimeEnum, suggestions: Suggestion[]) {
    switch (minutes) {
      case SuggestionFilterTimeEnum.Last5Minutes:
        this.suggestionsLast5Minutes = suggestions;
        break;
      case SuggestionFilterTimeEnum.Last10Minutes:
        this.suggestionsLast10Minutes = suggestions;
        break;
      case SuggestionFilterTimeEnum.Last30Minutes:
        this.suggestionsLast30Minutes = suggestions;
        break;
      case SuggestionFilterTimeEnum.LastHour:
        this.suggestionsLast60Minutes = suggestions;
        break;
      case SuggestionFilterTimeEnum.AllTime:
        this.allSuggestions = suggestions;
        break;
    }
  }
}