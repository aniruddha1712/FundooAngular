import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DataService } from 'src/app/Services/dataService/data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy ,OnInit{

  message:any;
  subscription: any;
  view:boolean=false;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `nav-content`,
  );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataservice:DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    // this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.dataservice.currentMessage.subscribe(message => this.message = message)
  }

  toList():void{
    if (this.view == true){
      this.view = false;
      this.dataservice.changeMessage('row');
    }
    else {
      this.view = true;
      this.dataservice.changeMessage('column');
    } 
  }
 
}
  
 
