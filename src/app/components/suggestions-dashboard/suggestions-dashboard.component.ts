import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

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


  suggestionsLast30Minutes: any[] = [];
  suggestionsLast60Minutes: any[] = [];
  suggestionsLast5Minutes: any[] = [];
  suggestionsLast10Minutes: any[] = [];
  allSuggestions: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.adminToken = params.get('id')!.toString();
    });

    this.isLoading = false;
  }

  voltar() {
    this.router.navigate(['/space-admin/' + this.adminToken]);
  }
}