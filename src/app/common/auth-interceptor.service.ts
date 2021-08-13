import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private userService: UserServiceService) {

   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/login') || req.url.includes('/registration') || req.url.includes('/items')) {
      return next.handle(req);
    }

    const authToken = this.userService.getToken();
    const authReuest = req.clone({
      //headers : req.headers.set('Authorization', 'Bearer ' + authToken)
      setHeaders: {
        'Authorization': `Bearer ${authToken}`
      },
    });
    return next.handle(authReuest);
  }
}
