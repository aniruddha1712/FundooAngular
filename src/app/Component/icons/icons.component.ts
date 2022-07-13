import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  isTrash: any;
  isArchive: any;
  @Input() noteObj:any;

  constructor(private noteService:NoteService) { }

  ngOnInit(): void {
    this.isTrash=this.noteObj.Trash;
    this.isArchive=this.noteObj.Archieve;
  }

  trash(){
    
    this.noteService.trashNote(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note trash status changed", response.data);
    });
  }

  archive(){
    this.noteService.archiveNote(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note archive status changed", response.data);
    });
  }

}
