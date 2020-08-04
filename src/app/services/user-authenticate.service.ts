import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from './api-urls';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticateService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<any>;

  constructor(public httpClient:HttpClient) {
    super(httpClient);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    
    return this.currentUserSubject.value;
}
  loginUser(user:User){
    const url=this.onlineCourseServiceURL+ApiUrl.authenticate;
    return this.postData(url,user).pipe(map(user=>{
      if(user && user.jwtToken){
        // localStorage.setItem('token',user.jwtToken);
        localStorage.setItem('token',JSON.stringify(user.jwtToken));
        localStorage.setItem('currentUser',JSON.stringify(user.user));
        this.currentUserSubject.next(user.user);
        
      }
      return user;
    }));
  }

  signUpUser(user:User){
    const url=this.onlineCourseServiceURL+ApiUrl.signUp;
    return this.postData(url,user);
  }

  getUserInfo(){
   const url=this.onlineCourseServiceURL+ApiUrl.userInfo;
    return this.getData(url);
  }

  updatePassword(value:any){
    const url=this.onlineCourseServiceURL+ApiUrl.updatePassword;
    return this.putData(url,value);
  }
  updateUserInfo(value:any){
    const url=this.onlineCourseServiceURL+ApiUrl.updateInfo;
    return this.putData(url,value).pipe(map(user=>{
      if(user && user.jwtToken){
        localStorage.setItem('token',JSON.stringify(user.jwtToken));
        localStorage.setItem('currentUser',JSON.stringify(user.user));
        this.currentUserSubject.next(user.user);
      }
      else{
        localStorage.setItem('currentUser',JSON.stringify(user.user));
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
}
  isAuthenticated(){
    
    return this.currentUserValue?true:false;
  }

  hasRole(roleName:string){
    let isAuthorised:boolean = false;
    if(!roleName || ("") === roleName){
      return isAuthorised;
    }else{
      if(this.currentUserValue.userRole.includes(roleName)){
        isAuthorised = true;
      }else{
        isAuthorised = false;
      }
    }
    return isAuthorised;
  }
}
