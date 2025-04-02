import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: string, password: string) : Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
