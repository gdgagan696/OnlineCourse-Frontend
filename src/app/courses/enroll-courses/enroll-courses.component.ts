import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UserCoursesService } from 'src/app/services/usercourses.service';
import { Course } from 'src/app/models/course.interface';
import { SuccessComponent } from 'src/app/helper/dialog/success/success.component';
import { DialogHandlingService } from 'src/app/services/dialog-handling.service';

@Component({
  selector: 'app-enroll-courses',
  templateUrl: './enroll-courses.component.html',
  styleUrls: ['./enroll-courses.component.css']
})
export class EnrollCoursesComponent implements OnInit {

  allCourses:Course[]=[];
  dataSource=new MatTableDataSource<any>();
  displayedColumns: string[];
  courseActions:string[];
  isLoading:boolean=false;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

 
  constructor(private userCourseService:UserCoursesService,private dialog:MatDialog,private dialogService:DialogHandlingService,private changeDetector:ChangeDetectorRef) { 
    this.displayedColumns= ['courseId','courseName','courseDuration','coursePrice','courseAction'];
    this.courseActions= ['DELETE'];
   
  }

  ngOnInit() {
    this.getAllEnrolledCourses();
  }

  getAllEnrolledCourses(){
    this.isLoading=true;
    const errorDialogData={
      dialogHeader:'Error',
      action:'error',
      message:''
      };
    this.userCourseService.getAllEnrollCourses().subscribe(result=>{
      this.allCourses=[...result];
      this.dataSource.data=[...this.allCourses];
      
      this.changeDetector.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading=false;
    },(error)=>{
      this.isLoading=false;
      console.error(error);
      errorDialogData.message=error;
      this.dialogService.showDialog(errorDialogData);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEnrollCourse(course:Course){
    this.isLoading=true;
    const errorDialogData={
      dialogHeader:'Delete Course',
      action:'delete',
      message:'Do You really want to delete this course from your bucket?'
      };
    const dialogRef=this.dialogService.showDeleteDialog(errorDialogData);
    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading=false;
      if(result==='Yes'){
        this.isLoading=true;
        this.userCourseService.deleteEnrollCourse(course.courseId).subscribe((result:any)=>{
          this.isLoading=false;
          if(result)this.openSuccessDialog(result.responseMsg);
        },(error)=>{
          this.isLoading=false;
          errorDialogData.dialogHeader='Error';
          errorDialogData.action='error';
          errorDialogData.message=error;
          this.dialogService.showDialog(errorDialogData);
          console.error("Error deleting  course");
        });
      }
    },(error=>{
      this.isLoading=false;
      console.error(error)
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
    this.getAllEnrolledCourses();
  });
  }


}
