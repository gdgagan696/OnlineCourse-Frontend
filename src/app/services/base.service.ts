import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  constructor(public httpClient: HttpClient) {}

  onlineCourseServiceURL = environment.onlineCourseServiceBaseURL;
  
  getData(url:string) {
    return this.httpClient.get<any>(url);
  }

  postData(url: string, dataObject: any) {
    return this.httpClient.post<any>(url, dataObject);
  }

  putData(url: string, dataObject: any) {
    return this.httpClient.put<any>(url, dataObject);
  }

  deleteData(url:string){
    return this.httpClient.delete(url);
  }

  getDataWithHeader(url:string, header: any) {
    return this.httpClient.get<any>(url, header);
  }
  postDataWithHeader(url: string, dataObject: any, header: any) {
    return this.httpClient.post<any>(url, dataObject, header);
  }

  putDataWithHeader(url: string, dataObject: any, header: any) {
    return this.httpClient.put<any>(url, dataObject, header);
  }

  deleteDataWithHeader(url: string,header: any) {
    return this.httpClient.delete(url,header);
  }

  postWithHeader(url: string,header: any) {
    return this.httpClient.post<any>(url, header);
  }
}
