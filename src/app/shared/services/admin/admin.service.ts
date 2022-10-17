import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SfUser } from '../../models/sf-user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  getUser(): Observable<SfUser> {
    return this.httpClient.get<SfUser>(environment.APP_BASE + '/users/me');
  }
}
