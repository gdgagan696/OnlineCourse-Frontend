import { Component, OnInit } from '@angular/core';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EditInfoComponent } from '../helper/dialog/edit-info/edit-info.component';
import { SuccessComponent } from '../helper/dialog/success/success.component';
import { DialogHandlingService } from '../services/dialog-handling.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo:any;
  userInfoTitle:String[];
  isDataAvailable:boolean = false;
  isAdmin:boolean = false;
  isLoading:boolean=false;
  constructor(private userAuthService:UserAuthenticateService,private dialog:MatDialog,private dialogService:DialogHandlingService) { }

  ngOnInit() {
    this.userAuthService.isAuthenticated();
    this.getUser();
  }

  getUser(){
    this.userInfo=this.userAuthService.currentUserValue;
    this.isDataAvailable=true;
    if(this.userInfo.userRole.includes('ADMIN')){
      this.isAdmin=true;
    }
  }

  editUserInfo(){
    this.isLoading=true;
    const errorDialogData={
      dialogHeader:'Error',
      action:'error',
      message:''
      };
    const dialogRef=this.dialog.open(EditInfoComponent,{
      width:'600px',
      height:'550px',
      disableClose:true,
      data:{userInfo:this.userInfo,isAdmin:this.isAdmin}
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading=false;
      if(result){
        this.isLoading=true;
        this.userAuthService.updateUserInfo(result).subscribe(value=>{
          this.isLoading=false;
          this.openSuccessDialog("Info Updated Successfully.");
        },(error=>{
          this.isLoading=false;
          errorDialogData.message=error;
          this.dialogService.showDialog(errorDialogData);
        }));
      }
    },(error=>{
      console.error(error);
    }));
  }

  openSuccessDialog(message:string){
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '35%',
      height: '35%',
      disableClose: true,
      data: {message:message}
  });
  dialogRef.afterClosed().subscribe(result=>{
    this.getUser();
  });
  }

}
