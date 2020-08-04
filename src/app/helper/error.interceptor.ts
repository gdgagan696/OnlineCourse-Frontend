import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ErrorConstants } from './error.constants';
import { DialogHandlingService } from '../services/dialog-handling.service';
import { Router } from '@angular/router';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private dialogService:DialogHandlingService,private router:Router,private userAuthService:UserAuthenticateService,
        private snackBar: MatSnackBar) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(error=>this.handleError(error)));
    }

    handleError(error:HttpErrorResponse){
        
        const data={
            dialogHeader:'Error',
            action:'error',
            message:''
        };
        if(error.status==ErrorConstants.ACCESS_DENIED){
            data.message=ErrorConstants.ACCESS_DENIED_MSG;
            this.dialogService.showDialog(data)
            return throwError(data.message);
        }
        else if(error.status==ErrorConstants.UNAUTHORIZED){
            data.message=ErrorConstants.UNAUTHORIZED_MSG;
            // this.dialogService.showDialog(data)
            this.snackBar.open(ErrorConstants.UNAUTHORIZED_MSG,'',{duration:5000});
            this.userAuthService.logout();
            this.router.navigateByUrl('/login');
            return throwError(data.message);
        }
        else if(error.status==ErrorConstants.SERVER_ERROR){
            data.message=ErrorConstants.SERVER_ERROR_MSG;
            this.dialogService.showDialog(data)
            return throwError(data.message);
        }
        else if(error.status==ErrorConstants.SERVICE_DOWN || error.status==0){
            data.message=ErrorConstants.SERVICE_DOWN_MSG;
            this.dialogService.showDialog(data)
            return throwError(data.message);
        }
        else if (error.error && error.error.errorMsg) {
            return throwError(error.error.errorMsg);
        }
        else{
            return throwError(`Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
    }
}