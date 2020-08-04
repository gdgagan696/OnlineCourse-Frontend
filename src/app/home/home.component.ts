import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticateService } from '../services/user-authenticate.service';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../helper/dialog/change-password/change-password.component';
import { SuccessComponent } from '../helper/dialog/success/success.component';
import { DialogHandlingService } from '../services/dialog-handling.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAdmin:boolean=false;
  isLoading:boolean=false;
  constructor(private router:Router,private userAuthService:UserAuthenticateService,private dialog:MatDialog,private dialogService:DialogHandlingService) { }

  ngOnInit() {
    this.checkIfAdmin();
  }
  checkIfAdmin(){
    this.isAdmin=this.userAuthService.hasRole('ADMIN');
  }  
  navigateToUrl(url:string){
    
    this.router.navigate([url,{isAdmin:this.isAdmin}]);
  }

  logOut(){
    this.userAuthService.logout();
    this.router.navigateByUrl('/login',{skipLocationChange:true});
  }
  changePassword(){
    this.isLoading=true;
    const dialogRef=this.dialog.open(ChangePasswordComponent,{
      width:'500px',
      height:'400px',
      disableClose:true
    });
    const data={
      dialogHeader:'Error',
      action:'error',
      message:''
    };
    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading=false;
      if(result){
        this.isLoading=true;
      this.userAuthService.updatePassword(result).subscribe((result:any)=>{
        this.isLoading=false;
        this.openSuccessDialog(result.responseMsg);
      },error=>{
        this.isLoading=false;
        console.error(error);
        data.message=error;
        this.dialogService.showDialog(data);
      })
    }},error=>{
      this.isLoading=false;
      console.error(error)
    });

  }

  openSuccessDialog(message:string){
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '35%',
      height: '35%',
      disableClose: true,
      data: {message:message}
  });
  }

  aboutOnlinePortal(){
    const data={
      dialogHeader:'About Online Course Portal',
      message:`It is just a small practice to make students aware about digital platform.For any queries contact <b>developers@gmail.com</b>.`
    }
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '35%',
      height: '40%',
      disableClose: true,
      data: data
  });

  }


}
