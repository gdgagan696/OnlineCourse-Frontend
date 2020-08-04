import { Component, OnInit, Inject } from '@angular/core';
import { DialogComponent } from '../dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  dialogHeader:string;
  message:string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.dialogHeader='Success';
    if(this.data){
      this.dialogHeader=this.data.dialogHeader?this.data.dialogHeader:this.dialogHeader;
      this.message=this.data.message;
    }
    else {
      console.warn('data not found in course dialog component');
    }
  }
  submitResponse(value:any){
    this.dialogRef.close(value);
  }


}
