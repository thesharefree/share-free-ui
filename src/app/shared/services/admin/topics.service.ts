import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Topic } from '../../models/topic';
import { Query } from '../../models/query';

@Injectable()
export class TopicsService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getTopics(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(environment.APP_BASE + '/topics/all');
  }

  getTopic(topicId: string): Observable<Topic> {
    return this.httpClient.get<Topic>(
      environment.APP_BASE + '/topics/' + topicId
    );
  }

  createTopic(topic: Topic): Observable<any> {
    return this.httpClient.post<any>(
      environment.APP_BASE + '/topics/create',
      topic
    );
  }

  toggleTopic(topicId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/topics/toggle/' + topicId,
      null
    );
  }

  getTopicQueries(topicId: string): Observable<Query[]> {
    return this.httpClient.get<Query[]>(
      environment.APP_BASE + '/topic/queries/' + topicId
    );
  }

  toggleTopicQuery(topicId: string, queryId: string): Observable<void> {
    let params = new HttpParams()
      .set('topicId', topicId)
      .set('queryId', queryId);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpClient.put<void>(
      environment.APP_BASE + '/topic/queries/toggle',
      { headers: headers },
      { params: params }
    );
  }
}
