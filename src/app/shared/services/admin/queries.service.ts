import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Query } from '../../models/query';

@Injectable()
export class QueriesService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getQueries(): Observable<Query[]> {
    return this.httpClient.get<Query[]>(environment.APP_BASE + '/queries/all');
  }

  getQuery(queryId: string): Observable<Query> {
    return this.httpClient.get<Query>(
      environment.APP_BASE + '/queries/' + queryId
    );
  }

  createQuery(query: Query): Observable<any> {
    return this.httpClient.post<any>(
      environment.APP_BASE + '/queries/create',
      query
    );
  }

  toggleQuery(queryId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/queries/toggle/' + queryId,
      null
    );
  }

  deleteQuery(queryId: string): Observable<void> {
    return this.httpClient.delete<void>(
      environment.APP_BASE + '/queries/' + queryId
    );
  }

  updateQuery(query: Query): Observable<any> {
    return this.httpClient.put<any>(
      environment.APP_BASE + '/queries/update/' + query._id,
      query
    );
  }
}
