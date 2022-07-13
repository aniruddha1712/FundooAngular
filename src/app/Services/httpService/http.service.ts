import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // BaseURL=environment.baseUrl;

  constructor(private httpclient:HttpClient) { }

  postService(url:string, reqdata:any, token:boolean=false, httpOtions:any){
    console.log(reqdata);
    return this.httpclient.post(url,reqdata,token && httpOtions)
  }

  putService(url:string, reqdata:any, token:boolean=false, httpOtions:any){
    console.log(reqdata);
    return this.httpclient.put(url,reqdata,token && httpOtions)
  }

  getService(url:string, token:boolean=true, httpOtions:any){
    console.log("inside http service");
    return this.httpclient.get(url,token && httpOtions)
  }

  patchService(url:string, reqdata:any){
    console.log(reqdata);
    return this.httpclient.patch(url,reqdata)
  }

  deleteService(url:string, reqdata:any){
    console.log(reqdata);
    return this.httpclient.delete(url,reqdata)
  }
}
