import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticateService } from '../services/user-authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private userAuthService:UserAuthenticateService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const currentUser = this.userAuthService.currentUserValue;
      
      // const currentUser=localStorage.getItem('currentUser');
      const token=localStorage.getItem('token');
      
      if (currentUser && token) {
          // authenticated so return true
          console.log('aunthenticated,url',state.url);
          if(state.url.includes('enrollCourses')){
            if(this.userAuthService.hasRole('USER')){
              return true;
            }
            else{
              console.log(' not authorized,url',state.url);
              this.router.navigateByUrl('/user-info',{skipLocationChange:true});
              return false;
            }
          }
          return true;
      } 
      else{
          // not logged in so redirect to login page with the return url
          console.log(' not aunthenticated,url',state.url);
        this.router.navigateByUrl('/login',{queryParams:{returnUrl:state.url}});
        return false;

      }
  }
      
}
