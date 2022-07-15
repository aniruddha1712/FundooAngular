import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/dataService/data.service';
import { UpdateComponent } from '../update/update.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {
  @Input() childMessage: any;
  message:any;
  subscription:any;

  constructor(private dialogs:MatDialog,private dataservice:DataService){ }
  @Output() updateEvent = new EventEmitter<string>();
  @Output() updatedIconData = new EventEmitter<any>();

  ngOnInit(): void {
    this.subscription = this.dataservice.currentMessage.subscribe(message => this.message = message)
  }

  openDialog(note:any):void{
    const dialogRef = this.dialogs.open(UpdateComponent,{
      width: '500px', height: 'fit-content',
      data: note,
    });

    dialogRef.afterClosed().subscribe((res:any) =>{
      console.log('dialog was closed');
      this.updateEvent.emit("hello");
    });
  }

  iconRefresh($event:any){
    // this.iconMsg = $event;
    this.updatedIconData.emit("hello");
    // this.getCollabsList()
  }
}
