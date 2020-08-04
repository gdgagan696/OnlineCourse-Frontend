import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { EnrollCoursesComponent } from './enroll-courses/enroll-courses.component';


const routes: Routes = [
  {
    path:'',component:CoursesComponent
  },
  {
    path:'enrollCourses',component:EnrollCoursesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
