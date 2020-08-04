import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoComponent } from './user-info.component';
import { MaterialModule } from '../material.module';
import { HelperModule } from '../helper/helper.module';


@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    MaterialModule,
    HelperModule
  ]
})
export class UserInfoModule { }
