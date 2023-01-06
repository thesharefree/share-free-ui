import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { House } from '../../models/house';

@Injectable()
export class HousesService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getHouses(): Observable<House[]> {
    return this.httpClient.get<House[]>(
      environment.APP_BASE + '/houses/all'
    );
  }

  getHouse(houseId: string): Observable<House> {
    return this.httpClient.get<House>(
      environment.APP_BASE + '/houses/' + houseId
    );
  }

  createHouse(house: House): Observable<any> {
    return this.httpClient.post<any>(
      environment.APP_BASE + '/houses/create',
      house
    );
  }

  toggleHouse(houseId: string): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/houses/toggle/' + houseId,
      null
    );
  }

  updateHouse(house: House): Observable<void> {
    return this.httpClient.put<void>(
      environment.APP_BASE + '/houses/update/' + house._id,
      house
    );
  }
}
