import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { DialogComponent } from './dialog/dialog.component';
import { MaterialModule } from '../material.module';
import { SuccessComponent } from './dialog/success/success.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { EditInfoComponent } from './dialog/edit-info/edit-info.component';


@NgModule({
  declarations: [DialogComponent, SuccessComponent, ChangePasswordComponent,LoadingComponent, EditInfoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[LoadingComponent],
  providers:[AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents:[DialogComponent,SuccessComponent,ChangePasswordComponent,EditInfoComponent]
})
export class HelperModule { }
