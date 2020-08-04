import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesService } from '../services/courses.service';
import { MaterialModule } from '../material.module';
import { HomeModule } from '../home/home.module';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnrollCoursesComponent } from './enroll-courses/enroll-courses.component';
import { UserCoursesService } from '../services/usercourses.service';
import { HelperModule } from '../helper/helper.module';



@NgModule({
  declarations: [CoursesComponent,CourseDialogComponent,EnrollCoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HelperModule
  ],
  entryComponents:[CourseDialogComponent],
  providers:[CoursesService,UserCoursesService]
})
export class CoursesModule { }
