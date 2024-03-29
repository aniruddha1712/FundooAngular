import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private noteService:NoteService, private snackBar:MatSnackBar) { }
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
    this.snackBar.open('Note Trashed','', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
  }

  archive(note:any){
    this.isArchive = !note.Archieve;
    this.noteService.archiveNote(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note archive status changed", response.data);
      this.changeNoteEvent.emit("archived/unarchived");
    });
    this.snackBar.open('Note archive status changed' ,'', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
  }

  restore(note:any){
    // this.isTrash = !note.Trash;
    this.noteService.restore(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note trash status changed", response.data);
      this.changeNoteEvent.emit("restored");
    });
    this.snackBar.open('Note Restored' ,'', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
  }

  deleteforever(note:any){
    this.noteService.delete(this.noteObj.NoteId).subscribe((response: any) => {
      console.log("Note deleted forever", response.data);
      this.changeNoteEvent.emit("deleted");
    });
    this.snackBar.open('Note deleted Permanently','', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
  }
  changeColor(newcolor: any){
    let data={
      NoteId:this.noteObj.NoteId,
      Colour:newcolor,
    }
    this.noteService.changeColor(data).subscribe((response:any)=>{
      console.log("color changed",response.data);
      this.changeNoteEvent.emit(newcolor);
    });
    this.snackBar.open('Colour changed successfully' ,'', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
  }
}
