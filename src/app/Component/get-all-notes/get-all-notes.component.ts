import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-get-all-notes',
  templateUrl: './get-all-notes.component.html',
  styleUrls: ['./get-all-notes.component.scss']
})
export class GetAllNotesComponent implements OnInit {
  noteArray:any;

  constructor(private note:NoteService) { }

  ngOnInit(): void {
    this.getAllNote();
  }

  getAllNote(){
    this.note.getAllNote().subscribe((res:any)=>{
      console.log(res.Data);
      this.noteArray=res.Data
    })
  }
  recieveMessage(e:any){
    console.log(e);
    this.getAllNote();
  }
  updateNote(e:any){
    console.log(e);
    this.getAllNote();
  }
  updatedIcon(e:any){
    this.getAllNote();
  }
}
