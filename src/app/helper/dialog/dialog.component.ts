import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  action:string;
  dialogHeader:string;
  message:string;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    if(this.data){
      this.dialogHeader = this.data.dialogHeader;
      this.action = this.data.action;
      this.message=this.data.message;
    }
    else {
      console.warn('data not found in course dialog component');
    }
  }
  submitResponse(value:any){
    this.dialogRef.close(value);
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
