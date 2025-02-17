import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpaceService } from '../../../services/space/space.service';
import { SongService } from '../../../services/song/song.service';

@Component({
    selector: 'app-space-details',
    templateUrl: './space-details.component.html',
    styleUrls: ['./space-details.component.scss'],
    standalone: false
})
export class SpaceDetailsComponent implements OnInit {

  spaceId: string = '';
  searchQuery: string = '';
  searchResults: any[] = [];

  currentPage: number = 1;
  pageSize: number = 10;
  totalResults: number = 0;
  totalPages: number = 0;

  nextPageToken: string = '';
  prevPageToken: string = '';

  pageToken: string = '';



  constructor(
    private route: ActivatedRoute,
    private spaceService: SpaceService,
    private songService: SongService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.spaceId = params.get('id')!.toString(); // Obtém o ID da rota
    });
  }

  search() {
    this.songService.search(this.searchQuery, this.pageSize, this.pageToken).subscribe(results => {
      console.log(results);
      this.searchResults = results;

      this.nextPageToken = results[0].nextPageToken;
      this.prevPageToken = results[0].prevPageToken;

      this.totalResults = results.length + 10;
      this.totalPages = Math.ceil(this.totalResults / this.pageSize);
    })
  }

  suggestSong(songId: any) {
    this.spaceService.suggestSong(this.spaceId, songId).subscribe(() => {
      alert('Música sugerida com sucesso!');
    });
  }

  changePage(page: number) {

    if (this.currentPage < page)
      this.pageToken = this.nextPageToken;
    else
      this.pageToken = this.prevPageToken;

    this.currentPage = page;
    this.search();
  }
}