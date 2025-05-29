import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SuggestionService } from '../../../services/suggestion.service';
import { SongService } from '../../../services/song.service';
import { SpaceService } from '../../../services/space.service';

@Component({
  selector: 'app-space-suggest',
  templateUrl: './space-suggest.component.html',
  styleUrls: ['./space-suggest.component.scss'],
  standalone: false
})
export class SpaceSuggestComponent implements OnInit {

  spaceToken: string = '';
  searchQuery: string = '';
  lastSearchQuery: string = '';
  searchResults: any[] = [];
  spaceName: string = 'Nome Teste';

  currentPage: number = 1;
  pageSize: number = 10;
  totalResults: number = 0;
  totalPages: number = 0;

  nextPageToken: string = '';
  prevPageToken: string = '';

  pageToken: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private songService: SongService,
    private router: Router,
    private toastrService: ToastrService,
    private suggestService: SuggestionService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.spaceToken = params.get('id')!.toString(); // Obtém o ID da rota
    });

    this.spaceService.getSpace(this.spaceToken).subscribe({
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
  }

  search(isPageChange: boolean = false) {
    if (!isPageChange) {
      this.pageToken = '';
      this.currentPage = 1;

      if (this.lastSearchQuery === this.searchQuery.trim())
        return;
    }

    if (!this.searchQuery.trim())
      return;

    this.songService.search(this.searchQuery, this.pageSize, this.pageToken).subscribe(results => {

      this.lastSearchQuery = this.searchQuery.trim();
      this.searchResults = results;

      this.nextPageToken = results[0].nextPageToken;
      this.prevPageToken = results[0].prevPageToken;

      this.totalResults = this.nextPageToken ? results.length + (10 * (this.currentPage)) : results.length;
      this.totalPages = Math.ceil(this.totalResults / this.pageSize);
    })
  }

  suggestSong(songId: any) {
    this.suggestService.suggestSong(this.spaceToken, songId).subscribe({
      next: () => {
        this.toastrService.success('Música sugerida com sucesso!', 'Sucesso');
      },
      error: (error) => {
        if (error.status === 429)
          this.toastrService.error('Você só pode sugerir uma música uma vez!', 'Música já sugerida');
        else
          this.toastrService.error('Não foi possível sugerir essa música', 'Ocorreu um erro');
      }
    });
  }

  changePage(page: number) {

    if (this.currentPage < page)
      this.pageToken = this.nextPageToken;
    else
      this.pageToken = this.prevPageToken;

    this.currentPage = page;
    this.search(true);
  }

  shareOnWhatsApp() {
    const message = `Venha participar da festa - ${this.spaceName} com VibeSync`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}