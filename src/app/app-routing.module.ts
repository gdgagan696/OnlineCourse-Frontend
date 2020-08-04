import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonComponent } from './home/common.component';
import { AuthGuard } from './helper/auth.guard';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
{path:'',component:CommonComponent,canActivate:[AuthGuard],children:
[{path:'allCourses',loadChildren:'./courses/courses.module#CoursesModule'},
{path:'user-info',loadChildren:'./user-info/user-info.module#UserInfoModule'}
]},
{path:'login',loadChildren:'./login/login.module#LoginModule'},

{path:'**',redirectTo:'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
