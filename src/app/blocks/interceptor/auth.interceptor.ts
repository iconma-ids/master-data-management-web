import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public resourceUrl = "";
  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService) {
    // alert("intercepter")
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {debugger;
    // if (!request || !request.url || (request.url.startsWith('http') && !(this.resourceUrl && request.url.startsWith(this.resourceUrl)))) {
    //   return next.handle(request);
    // }

    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    return next.handle(request);
  }
}
