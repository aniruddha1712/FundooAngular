import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/dataService/data.service';
import { UpdateComponent } from '../update/update.component';
import { Subscription } from 'rxjs';
import { FilterDataService } from 'src/app/Services/dataService/filter-data.service';

@Component({
  selector: 'app-display-note',
  templateUrl: './display-note.component.html',
  styleUrls: ['./display-note.component.scss']
})
export class DisplayNoteComponent implements OnInit {
  @Input() childMessage: any;
  message:any;
  subscription:any;
  searchString:any='';
  grid:any=false;

  constructor(private dialogs:MatDialog,private dataservice:DataService,private filterDataService:FilterDataService){ }
  @Output() updateEvent = new EventEmitter<any>();
  @Output() updatedIconData = new EventEmitter<any>();

  ngOnInit(): void {
    this.subscription = this.dataservice.currentMessage.subscribe(message => 
      {this.message = message
       console.log("message recieved",message)  ;
       if(this.message=='row'){
        this.grid=false;
       }
       else if(this.message=='column'){
        this.grid=true;
       }
      });
    

    this.filterDataService.currentMessage.subscribe((response: any) => {
      console.log("Data recieved", response);
      this.searchString = response
    })
  }

  openDialog(note:any):void{
    const dialogRef = this.dialogs.open(UpdateComponent,{
      width: 'fit-content', height: 'fit-content',
      data: note,
      panelClass: 'my-custom-dialog-class'

    });

    dialogRef.afterClosed().subscribe((res:any) =>{
      console.log('dialog was closed');
      this.updateEvent.emit("hello");
    });
  }

  iconRefresh($event:any){
    this.updatedIconData.emit("hello");
  }
}
