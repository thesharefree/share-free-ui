import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable()
export class UsersService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      environment.APP_BASE + '/users/all'
    );
  }

  getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(
      environment.APP_BASE + '/users/' + userId
    );
  }

  createAdmin(user: User): Observable<any> {
    return this.httpClient.post<any>(
      environment.APP_BASE + '/users/createAdmin',
      user
    );
  }

  toggleUser(userId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/users/toggle/' + userId,
      null
    );
  }

  updateUser(user: User): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/users/update/' + user._id,
      user
    );
  }
}
