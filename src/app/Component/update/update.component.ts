import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/Services/noteService/note.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  title:any;
  desc:any;
  color:any;

  @Output() updatedIconData = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA)public data: any,private note:NoteService,private snackBar:MatSnackBar
    ) { }


  ngOnInit(): void {
    console.log(this.data);
    this.title=this.data.Title;
    this.desc=this.data.TakeNote; 
    this.color=this.data.Colour;
  }

  onClick(){
    console.log(this.title,this.desc);
    let data={
      NoteId:this.data.NoteId,
      Title:this.title,
      TakeNote:this.desc,
    }
    console.log("do api call");
    this.note.updateNote(data).subscribe((res:any)=>{
      console.log(res);
    });
    this.snackBar.open('Note Updated','', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'start'
    });
    
    this.dialogRef.close();
  }
  iconRefresh(event:any){
    console.log(event);
    this.color=event;
  }

}
