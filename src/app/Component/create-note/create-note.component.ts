import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  createnote!:FormGroup;

  data:any;
  
  constructor(private note:NoteService,private fb:FormBuilder,private snackBar:MatSnackBar) { }
  isShow=false;
  @Output() createEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.createnote = this.fb.group({
      title:['',[Validators.required,Validators.minLength(1)]],
      desc:['',[Validators.required,Validators.minLength(1)]],
    })
   
  }
  saveNote(){
    this.isShow=false;
    
    if(this.createnote.valid){
      console.log("valid data", this.createnote.value);
      console.log("do api call");
      let body={
        Title:this.createnote.value.title,
        TakeNote:this.createnote.value.desc
      }
      this.note.createNote(body).subscribe((res:any)=>{
        console.log(res);
        this.createEvent.emit("hello");
      });
      this.snackBar.open('New Note Created','', {
        duration: 3000,
        verticalPosition: 'bottom'
      });
    }
    else{
      console.log("cannot create note");
      console.log("no api call");
    }
    this.createnote.reset();
  }

  show(){
    this.isShow=true;
  }

  close(){
    this.isShow=false;
  }
}