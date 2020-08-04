import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrl } from './api-urls';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService extends BaseService {

  constructor(public httpClient:HttpClient) {
    super(httpClient);
   }

  getAllEnrollCourses(){
    const url=this.onlineCourseServiceURL+ApiUrl.allEnrollCourses;
    return this.getData(url);
  }
  
  enrollNewCourse(courseId:string){
      const url=this.onlineCourseServiceURL+ApiUrl.enrollNewCourse+courseId;
      return this.postData(url,courseId);
    }


 deleteEnrollCourse(courseId:number){
   const url=this.onlineCourseServiceURL+ApiUrl.deleteEnrollCourse+courseId;
   return this.deleteData(url);
 }
}
