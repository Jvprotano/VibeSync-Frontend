import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suggestion } from '../../models/suggestion-model';

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  private apiUrl = 'http://localhost:5260/api/suggestion';

  constructor(private http: HttpClient) { }

  suggestSong(spaceToken: string, songId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/suggest`, { spaceToken, songId });
  }

  getSuggestions(spaceAdminToken: string, amount: number, startDate?: string, endDate?: string): Observable<Suggestion[]> {
    return this.http.get<Suggestion[]>(`${this.apiUrl}/suggestions?SpaceAdminToken=${spaceAdminToken}&StartDateTime=${startDate}&EndDateTime=${endDate}&Amount=${amount}`);
  }
}