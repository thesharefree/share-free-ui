import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';

@Injectable()
export class MessagingService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(environment.APP_BASE + '/groups/all');
  }

  notifyJoinGroup(groupId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/messages/notifyJoinGroup/' + groupId,
      null
    );
  }

  generalAnnouncement(title: string, message: string): Observable<void> {
    let params = new HttpParams().set('title', title).set('message', message);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.put<void>(
      environment.APP_BASE + '/messages/generalAnnouncement',
      { headers: headers },
      { params: params }
    );
  }
}
