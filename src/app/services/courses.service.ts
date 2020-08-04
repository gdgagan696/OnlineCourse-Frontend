import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUrl } from './api-urls';
import { Course } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends BaseService {

  constructor(public httpClient:HttpClient) {
    super(httpClient);
   }

   
   getAllCourses(){
     const url=this.onlineCourseServiceURL+ApiUrl.allCourses;
     return this.getData(url);
  }

  addNewCourse(course:Course){
    const url=this.onlineCourseServiceURL+ApiUrl.addNewCourse;
    return this.postData(url,course);
  }

  editCourse(course:Course){
    const url=this.onlineCourseServiceURL+ApiUrl.editCourse;
    return this.putData(url,course);
  }

  deleteCourse(courseId:number){
    const url=this.onlineCourseServiceURL+ApiUrl.deleteCourse+courseId;
    return this.deleteData(url);;
  }
}
