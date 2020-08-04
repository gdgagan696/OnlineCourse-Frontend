import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { CoursesModule } from '../courses/courses.module';
import { CommonComponent } from './common.component';
import { HelperModule } from '../helper/helper.module';



@NgModule({
  declarations: [HomeComponent,CommonComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    CoursesModule,
    HelperModule
  ],
  providers:[],
})
export class HomeModule { }
