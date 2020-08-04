import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {

  editForm:FormGroup;
  
  roles:String[]=[];
  constructor(private formBuilder:FormBuilder,private dialogRef:MatDialogRef<EditInfoComponent>,@Inject(MAT_DIALOG_DATA)public data:any) { }

  ngOnInit() {
    
    this.data.isAdmin?this.roles.push('ADMIN'):this.roles.push('USER');
    this.createEditForm();
  }

  closeDialog(){
    this.dialogRef.close();
  }

  createEditForm(){
    this.editForm=this.formBuilder.group({
      'firstName':[this.data.userInfo.firstName,[Validators.minLength(5),Validators.required]],
      'lastName':[this.data.userInfo.lastName],
      'regNo':[this.data.userInfo.regNo,[Validators.minLength(5),Validators.required]],
      'email':[this.data.userInfo.email,[Validators.required,Validators.email]],
      'roles':[this.data.userInfo.userRole,[Validators.required]],
      'userName':[this.data.userInfo.userName,[Validators.minLength(5),Validators.required]],
    })
  }




  getErrorMessage(){
    if(this.editForm.controls['firstName'].invalid){
     return this.editForm.controls['firstName'].hasError('required') ? 'You must enter a value' :
         this.editForm.controls['firstName'].hasError('minlength') ? 'Required length is at least 5 characters' :
            '';
     }
     if(this.editForm.controls['regNo'].invalid){
       return this.editForm.controls['regNo'].hasError('required') ? 'You must enter a value' :
           this.editForm.controls['regNo'].hasError('minlength') ? 'Required length is at least 5 characters' :
              '';
     }
     if(this.editForm.controls['email'].invalid){
         return this.editForm.controls['email'].hasError('required') ? 'You must enter a value' :
             this.editForm.controls['email'].hasError('email') ? 'Inavlid email Id Entered' :
                '';
     }
     if(this.editForm.controls['roles'].invalid){
       return this.editForm.controls['roles'].hasError('required') ? 'You must select a value' :'';
   }
     if(this.editForm.controls['userName'].invalid){
     return this.editForm.controls['userName'].hasError('required') ? 'You must enter a value' :
         this.editForm.controls['userName'].hasError('minlength') ? 'Required length is at least 5 characters' :
            '';
     }
     return this.editForm.controls['password'].hasError('required') ? 'You must enter a value' :
         this.editForm.controls['password'].hasError('minlength') ? 'Required length is at least 5 characters' :
            '';
     }
   

}
