import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  formGroup:FormGroup;
  action:string;
  dialogHeader:string;
  isHidden:boolean=true;

  constructor(public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder:FormBuilder) { }

  ngOnInit() {
    if(this.data){
      this.dialogHeader = this.data.dialogHeader;
      this.action = this.data.action;
      this.isHidden=this.data.isHidden;
    }
    else {
      console.warn('data not found in course dialog component');
    }
    if(this.action==='Edit'){
    this.createEditForm();
    }
    else{
      this.createAddForm();
    }
  }
  closeDialog(){
    this.dialogRef.close();
  }

  createEditForm(){
    this.formGroup=this.formBuilder.group({
      'courseId':[{value:this.data.courseId,disabled:true},[Validators.required]],
      'courseName':[this.data.courseName,[Validators.required]],
      'courseDuration':[this.data.courseDuration,[Validators.min(1),Validators.required]],
      'coursePrice':[this.data.coursePrice,[Validators.min(1),Validators.required]]
    })
  }

  createAddForm(){
    this.formGroup=this.formBuilder.group({
      'courseId':[{value:'',disabled:true},[Validators.required]],
      'courseName':['',[Validators.required]],
      'courseDuration':['',[Validators.min(1),Validators.required]],
      'coursePrice':['',[Validators.min(1),Validators.required]]
    })
  }

  getErrorMessage(){}

}
