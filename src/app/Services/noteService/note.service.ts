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

  updateNote(data:any){
    console.log(data);

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.putService('https://localhost:44378/api/Note/editnote',data,false,header)
  }

  trashNote(noteId: any){
    console.log(noteId);
    console.log("Note trashed");
    return this.http.deleteService(`https://localhost:44378/api/Note/movetotrash/${noteId}`,noteId);
  }

  archiveNote(noteId: any){
    console.log(noteId);
    console.log("Note Archived");
    return this.http.patchService(`https://localhost:44378/api/Note/archivenote/${noteId}`,noteId);
  }

  getArchiveNote(){
    console.log("Getting Archived notes");

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.http.getService('https://localhost:44378/api/Note/getarchivenotes',true,header)
  }
  getTrashNote(){
    console.log("Getting trashed notes");

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization':'Bearer '+this.token
      })
    }
    return this.http.getService('https://localhost:44378/api/Note/gettrashnotes',true,header)
  }

  restore(noteId: any){
    console.log(noteId);
    console.log("Note restored");
    return this.http.patchService(`https://localhost:44378/api/Note/restorefromtrash/${noteId}`,noteId);
  }

  delete(noteId: any){
    console.log(noteId);
    console.log("Note deleted");
    return this.http.deleteService(`https://localhost:44378/api/Note/deleteforever/${noteId}`,noteId);
  }

  changeColor(data:any){
    console.log(data);

    let header={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    }
    return this.http.putService('https://localhost:44378/api/Note/changecolour',data,false,header)
  }
}
