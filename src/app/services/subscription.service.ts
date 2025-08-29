import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService {

  cancelSubscription(): Observable<any> {
    const url = `/subscription/cancel`;
    return this.postAuth(url, {});
  }
}
