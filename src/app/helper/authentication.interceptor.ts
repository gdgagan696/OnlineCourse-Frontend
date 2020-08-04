import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private userAuthService: UserAuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        
        const currentUser = this.userAuthService.currentUserValue;
        const token=JSON.parse(localStorage.getItem('token'));
        const isLoggedIn = currentUser && token;
        const isApiUrl = request.url.startsWith(environment.onlineCourseServiceBaseURL);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders:{
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}