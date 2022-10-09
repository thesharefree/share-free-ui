import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Organization } from '../../models/organization';

@Injectable()
export class OrganizationsService {
  constructor(@SkipSelf() private httpClient: HttpClient) {}

  getOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<Organization[]>(environment.APP_BASE + '/organizations/all');
  }

  getOrganization(organizationId: string): Observable<Organization> {
    return this.httpClient.get<Organization>(
      environment.APP_BASE + '/organizations/' + organizationId
    );
  }

  createOrganization(organization: Organization): Observable<any> {
    return this.httpClient.post<any>(
      environment.APP_BASE + '/organizations/create',
      organization
    );
  }
}
