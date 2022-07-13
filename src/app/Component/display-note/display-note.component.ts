import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {
  @Input() childMessage: any;

  constructor(private dialogs:MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(note:any):void{
    const dialogRef = this.dialogs.open(UpdateComponent,{
      width: '500px',
      data: note,
    });

    dialogRef.afterClosed().subscribe((res:any) =>{
      console.log('dialog was closed');
    });
  }
}
