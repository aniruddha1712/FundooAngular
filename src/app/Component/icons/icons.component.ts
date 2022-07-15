import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  colorArray = [{Colorcode:"white", name:"White"},{Colorcode:"#f28b82", name:"Red"},{Colorcode:"#fbbc04", name:"Orange"},
                {Colorcode:"#fff475", name:"Yellow"},{Colorcode:"#ccff90", name:"Green"},{Colorcode:"#a7ffeb", name:"Teel"},
                {Colorcode:"#cbf0f8", name:"Blue"},{Colorcode:"#aecbfa", name:"Dark-Blue"},{Colorcode:"#d7aefb", name:"Purple"},
                {Colorcode:"#fdcfe8", name:"Pink"},{Colorcode:"#e6c9a8", name:"Brown"},{Colorcode:"#e8eaed", name:"Gray"}];

  constructor(private noteService:NoteService) { }
  @Output() changeNoteEvent = new EventEmitter<string>();

  ngOnInit(): void {
    this.isTrash=this.noteObj.Trash;
    this.isArchive=this.noteObj.Archieve;
  }

  trash(note:any){
    this.isTrash = !note.Trash;
    this.noteService.trashNote(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note trash status changed", response.data);
      this.changeNoteEvent.emit("trashed");
    });
  }

  archive(note:any){
    this.isArchive = !note.Archieve;
    this.noteService.archiveNote(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note archive status changed", response.data);
      this.changeNoteEvent.emit("archived/unarchived");
    });
  }

  restore(note:any){
    // this.isTrash = !note.Trash;
    this.noteService.restore(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note trash status changed", response.data);
      this.changeNoteEvent.emit("restored");
    });
  }

  deleteforever(note:any){
    this.noteService.delete(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note deleted forever", response.data);
      this.changeNoteEvent.emit("deleted");
    });
  }
  changeColor(newcolor: any){
    let data={
      NoteId:this.noteObj.NoteId,
      Colour:newcolor,
    }
    this.noteService.changeColor(data).subscribe((response:any)=>{
      console.log("color changed",response.data);
      this.changeNoteEvent.emit("color changed");
    });
  }
}
