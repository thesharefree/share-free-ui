import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { firstValueFrom, from, lastValueFrom, Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  constructor(private auth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handle(request, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = await firstValueFrom(this.auth.idTokenResult);

    const authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + idToken?.token,
      },
    });

    return await lastValueFrom(next.handle(authReq));
  }
}
