import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';
import { UserAuthenticateService } from 'src/app/services/user-authenticate.service';
import { error } from 'protractor';
import { DialogHandlingService } from 'src/app/services/dialog-handling.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from 'src/app/helper/dialog/success/success.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup;
  roles:String[]=['USER']
  isLoading:boolean=false;
  constructor(private formBuilder:FormBuilder,private router:Router,private userAuthService:UserAuthenticateService,private dialogService:DialogHandlingService,private dialog:MatDialog) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  createSignUpForm(){
    this.signUpForm=this.formBuilder.group({
      'firstName':['',[Validators.minLength(5),Validators.required]],
      'lastName':[''],
      'regNo':['',[Validators.minLength(5),Validators.required]],
      'email':['',[Validators.required,Validators.email]],
      'roles':['',[Validators.required]],
      'userName':['',[Validators.minLength(5),Validators.required]],
      'password':['',[Validators.minLength(8),Validators.required]]
    })
  }
  signUpUser(formValue:any){
    this.isLoading=true;
    const data={
      dialogHeader:'Error',
      action:'error',
      message:''
    };
    const user:User={
      firstName:formValue.firstName,
      lastName:formValue.lastName,
      regNo:formValue.regNo,
      email:formValue.email,
      userRole:formValue.roles,
      userName:formValue.userName,
      password:formValue.password,
    }
    this.userAuthService.signUpUser(user).subscribe(result=>{
      this.isLoading=false;
      if(result)this.openDialog(result.responseMsg);
    },(error:string)=>{
      this.isLoading=false;
      data.message=`${error}Please Try again.`; 
      this.dialogService.showDialog(data);
    });

  }

  openDialog(message:string){
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '35%',
      height: '35%',
      disableClose: false,
      data: {message:message}
  });
  dialogRef.afterClosed().subscribe(result=>{
    this.router.navigateByUrl('/login',{skipLocationChange:true});
  });
  }
 getErrorMessage(){
   if(this.signUpForm.controls['firstName'].invalid){
    return this.signUpForm.controls['firstName'].hasError('required') ? 'You must enter a value' :
        this.signUpForm.controls['firstName'].hasError('minlength') ? 'Required length is at least 5 characters' :
           '';
    }
    if(this.signUpForm.controls['regNo'].invalid){
      return this.signUpForm.controls['regNo'].hasError('required') ? 'You must enter a value' :
          this.signUpForm.controls['regNo'].hasError('minlength') ? 'Required length is at least 5 characters' :
             '';
    }
    if(this.signUpForm.controls['email'].invalid){
        return this.signUpForm.controls['email'].hasError('required') ? 'You must enter a value' :
            this.signUpForm.controls['email'].hasError('email') ? 'Inavlid email Id Entered' :
               '';
    }
    if(this.signUpForm.controls['roles'].invalid){
      return this.signUpForm.controls['roles'].hasError('required') ? 'You must select a value' :'';
  }
    if(this.signUpForm.controls['userName'].invalid){
    return this.signUpForm.controls['userName'].hasError('required') ? 'You must enter a value' :
        this.signUpForm.controls['userName'].hasError('minlength') ? 'Required length is at least 5 characters' :
           '';
    }
    return this.signUpForm.controls['password'].hasError('required') ? 'You must enter a value' :
        this.signUpForm.controls['password'].hasError('minlength') ? 'Required length is at least 8 characters' :
           '';
    }
  
  logIn(){
    this.router.navigateByUrl('/login',{skipLocationChange:true});
  }

}
