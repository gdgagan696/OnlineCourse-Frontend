import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../services/courses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { Course } from '../models/course.interface';
import { ActivatedRoute } from '@angular/router';
import { UserCoursesService } from '../services/usercourses.service';
import { SuccessComponent } from '../helper/dialog/success/success.component';
import { DialogHandlingService } from '../services/dialog-handling.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  allCourses:Course[]=[];
  dataSource=new MatTableDataSource<any>();
  displayedColumns: string[];
  isAdmin:string;
  isDataAvailable:boolean=false;
  isLoading:boolean=false;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

 
  constructor(private route:ActivatedRoute,private courseService:CoursesService,private userCourseService:UserCoursesService,private dialogService:DialogHandlingService,private dialog:MatDialog,private changeDetector:ChangeDetectorRef) { 
    this.displayedColumns= ['courseId','courseName','courseDuration','coursePrice','courseAction'];
  }

  ngOnInit() {
    this.isAdmin=this.route.snapshot.paramMap.get('isAdmin');
    this.getAllAvailableCourses();
  }

  getAllAvailableCourses(){
    this.isLoading=true;
    const errorDialogData={
      dialogHeader:'Error',
      action:'error',
      message:''
      };
    this.courseService.getAllCourses().subscribe(result=>{
      this.allCourses=[...result];
      this.isDataAvailable=true;
      this.dataSource.data=[...this.allCourses];
      this.changeDetector.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading=false;
    },(error)=>{
      this.isLoading=false;
      errorDialogData.message=error;
      this.dialogService.showDialog(errorDialogData);
      console.error(error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToCourseList(course:any){
    this.isLoading=true;
    const errorDialogData={
      dialogHeader:'Error',
      action:'error',
      message:''
      };
    this.userCourseService.enrollNewCourse(course.courseId).subscribe(result=>{
      this.isLoading=false;
      if(result)this.openSuccessDialog(result.responseMsg);
    },(error=>{
      this.isLoading=false;
      errorDialogData.message=error;
      this.dialogService.showDialog(errorDialogData);
    }));
  }

  editCourse(course:any){
    this.isLoading=true;
    const data=course;
    data.action='Edit';
    data.dialogHeader='Edit Course'
    data.isHidden=true;
   const dialogRef =this.openDialog('500px','500px',true,data);
   const errorDialogData={
    dialogHeader:'Error',
    action:'error',
    message:''
    };
   dialogRef.afterClosed().subscribe(result=>{
    this.isLoading=false;
    if(result){
      this.isLoading=true;
      const editCourse=result;
      editCourse.courseId=course.courseId;
      this.courseService.editCourse(editCourse).subscribe(result=>{
        this.isLoading=false;
        if(result)this.openSuccessDialog(result.responseMsg);
      },(error)=>{
        this.isLoading=false;
        errorDialogData.message=error;
        this.dialogService.showDialog(errorDialogData);
        console.error("Error editing course");
    });
  }
   },error=>{
     this.isLoading=false;
     console.error(error)
  });
  }

  deleteCourse(course:any){
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
        this.courseService.deleteCourse(course.courseId).subscribe((result:any)=>{
          this.isLoading=false;
          
          if(result)this.openSuccessDialog(result.responseMsg);
        },(error)=>{
          this.isLoading=false;
          errorDialogData.dialogHeader='Error';
          errorDialogData.action='error';
          errorDialogData.message=error;
          this.dialogService.showDialog(errorDialogData);
          console.error("Error deleting course");
          });
      }
    },(error=>{
      this.isLoading=false;
      console.error(error);
    }))
    
  }

  addNewCourse(){
    this.isLoading=true;
    const data={
      action:'Add',
      dialogHeader:'Add New Course',
      isHidden:false
    }
    const errorDialogData={
      dialogHeader:'Error',
      action:'error',
      message:''
      };
    
    const dialogRef =this.openDialog('500px','400px',true,data);
    dialogRef.afterClosed().subscribe(result=>{
      this.isLoading=false;
    if(result){
      this.isLoading=true;
      const course=result;
      this.courseService.addNewCourse(course).subscribe(result=>{
        this.isLoading=false;
        if(result)this.openSuccessDialog(result.responseMsg);
      },(error)=>{
        this.isLoading=false;
        errorDialogData.message=error;
        this.dialogService.showDialog(errorDialogData);
        console.error("Error adding new course");
      });
    }
   },(error)=>{
    this.isLoading=false;
     console.error("error adding course");
   });
  }

openDialog(width:string,height:string,disableClose:boolean,data){
  const dialogConfig=new MatDialogConfig;
  dialogConfig.width=width;
  dialogConfig.height=height;
  dialogConfig.disableClose=disableClose;
  dialogConfig.data=data;
  const dialogRef=this.dialog.open(CourseDialogComponent,dialogConfig);
  return dialogRef;
}

openSuccessDialog(message:string){
  const dialogRef = this.dialog.open(SuccessComponent, {
    width: '35%',
    height: '35%',
    disableClose: true,
    data: {message:message}
});
dialogRef.afterClosed().subscribe(result=>{
  
  this.getAllAvailableCourses();
});
}
  

}
