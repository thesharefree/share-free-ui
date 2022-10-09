import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Topic } from '../../models/topic';

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
}
