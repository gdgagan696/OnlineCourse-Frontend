import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PasswordValidation } from '../../confirm-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private dialogRef:MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit() {
    this.createForm();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  createForm(){
    this.passwordForm=this.formBuilder.group({
      'oldPassword':['',[Validators.minLength(8),Validators.required]],
      'newPassword':['',[Validators.minLength(8),Validators.required]],
      'rePassword':['',[Validators.minLength(8),Validators.required]]
    },{validator:PasswordValidation.matchPassword}
    );
  }

  getErrorMessage(){
    if(this.passwordForm.controls['oldPassword'].invalid){
      return this.passwordForm.controls['oldPassword'].hasError('required') ? 'You must enter a value' :
          this.passwordForm.controls['oldPassword'].hasError('minlength') ? 'Required length is at least 8 characters' :
             '';
      }
      if(this.passwordForm.controls['newPassword'].invalid){
        return this.passwordForm.controls['newPassword'].hasError('required') ? 'You must enter a value' :
            this.passwordForm.controls['newPassword'].hasError('minlength') ? 'Required length is at least 8 characters' :
               '';
        }
        if(this.passwordForm.controls['rePassword'].invalid){
          return this.passwordForm.controls['rePassword'].hasError('required') ? 'You must enter a value' :
              this.passwordForm.controls['rePassword'].hasError('minlength') ? 'Required length is at least 8 characters' :
              this.passwordForm.controls['rePassword'].hasError('matchPassword') ? 'New and Re entered password not matched' :
              '';
        }
  }

}
