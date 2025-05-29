import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Suggestion } from '../models/suggestion.model';
import { SuggestionFilterTime } from '../enums/suggestion-filter-time.enum';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private apiUrl = environment.apiUrl + '/suggestion';

  private suggestedSongs = JSON.parse(localStorage.getItem('suggestedSongs') || '[]');

  constructor(private http: HttpClient) { }

  suggestSong(spaceToken: string, songId: string): Observable<any> {

    if (this.suggestedSongs.includes(songId)) {

      return new Observable(observer => {
        observer.error({ status: 429, message: 'Song already suggested' });
      });
    }

    this.suggestedSongs.push(songId);
    localStorage.setItem('suggestedSongs', JSON.stringify(this.suggestedSongs));

    return this.suggest(spaceToken, songId);
  }

  private suggest(spaceToken: string, songId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggest`, { spaceToken, songId });
  }

  getSuggestions(spaceAdminToken: string, amount: number, timeFilter: SuggestionFilterTime): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.apiUrl}/suggestions?SpaceAdminToken=${spaceAdminToken}&TimeFilter=${timeFilter}&Amount=${amount}`);
  }
}