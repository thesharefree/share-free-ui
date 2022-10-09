import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Token } from "../../models/token";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { SfUser } from "../../models/sf-user";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<Token> {
    const httpParams = new HttpParams();
    httpParams.append("email", email);
    httpParams.append("password", password);
    return this.httpClient.post<Token>(environment.APP_BASE + "/login", {
      params: httpParams,
    });
  }

  getUser(): Observable<SfUser> {
    return this.httpClient.get<SfUser>(environment.APP_BASE + "/users/me");
  }
}
