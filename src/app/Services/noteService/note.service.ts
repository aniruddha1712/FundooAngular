import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  token:any;
  constructor(private http: HttpService) { this.token=localStorage.getItem('token') }

  createNote(data:any){
    console.log(data);

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.http.postService('https://localhost:44378/api/Note/createnote',data,true,header)
  }

  getAllNote(){
    console.log("Getting notes",this.token);

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.http.getService('https://localhost:44378/api/Note/getnotes',true,header)
  }
}
