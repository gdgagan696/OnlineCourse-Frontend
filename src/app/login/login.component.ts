import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';
import { DialogHandlingService } from '../services/dialog-handling.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isLoading:boolean=false;
  constructor(private formBuilder:FormBuilder,private userAuthService:UserAuthenticateService,private router: Router,private dialogService:DialogHandlingService) { 
    
    if(userAuthService.currentUserValue){
      this.router.navigateByUrl('/user-info');    
    }
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      'userName':['',[Validators.minLength(5),Validators.required]],
      'password':['',[Validators.minLength(8),Validators.required]]
    })
  }

  loginUser(formValue:any){
    this.isLoading=true;
    const user:User = {
      userName:formValue.userName,
      password:formValue.password 
    }
    const data={
      dialogHeader:'Error',
      action:'error',
      message:''
    };
    this.userAuthService.loginUser(user).subscribe(result=>{
      this.isLoading=false;
      if(result){
        this.router.navigateByUrl('/user-info');
      }
    },(error: string)=>{
      this.isLoading=false;
      data.message=`${error}Please Try again.`; 
      this.dialogService.showDialog(data);
    });
  }
  
  getErrorMessage(){
    if(this.loginForm.controls['userName'].invalid){
    return this.loginForm.controls['userName'].hasError('required') ? 'You must enter a value' :
        this.loginForm.controls['userName'].hasError('minlength') ? 'Required length is at least 5 characters' :
           '';
    }
    return this.loginForm.controls['password'].hasError('required') ? 'You must enter a value' :
        this.loginForm.controls['password'].hasError('minlength') ? 'Required length is at least 8 characters' :
           '';
  }
  
  signUp(){
    
    this.router.navigateByUrl('/login/signup',{skipLocationChange:true});
  }

}
