import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  noteArray:any;

  constructor(private note:NoteService) { }

  ngOnInit(): void {
    this.getTrashNote();
  }

  getTrashNote(){
    this.note.getTrashNote().subscribe((res:any)=>{
      console.log(res.Data);
      this.noteArray=res.Data
    })
  }

}
