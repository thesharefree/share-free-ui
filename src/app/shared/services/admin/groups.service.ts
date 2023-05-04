import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Group } from '../../models/group';

@Injectable()
export class GroupsService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(environment.APP_BASE + '/groups/all');
  }

  getGroup(groupId: string): Observable<Group> {
    return this.httpClient.get<Group>(
      environment.APP_BASE + '/groups/' + groupId
    );
  }

  toggleGroup(groupId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/groups/toggle/' + groupId,
      null
    );
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.httpClient.delete<void>(
      environment.APP_BASE + '/groups/delete/' + groupId
    );
  }
}
