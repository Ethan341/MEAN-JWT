import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(){
    console.log("Intercepting........")
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting........",req,next)
    const token = localStorage['token']; // you probably want to store it in localStorage or something

    if (!token) {
      return next.handle(req);
    }

    const reqWithToken = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next.handle(reqWithToken);
  }

}