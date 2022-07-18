import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { DataService } from 'src/app/Services/dataService/data.service';
// import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FilterDataService } from 'src/app/Services/dataService/filter-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy ,OnInit{

  message:any;
  subscription: any;
  view:boolean=false;
  searchString:any='';
  search:any='';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    {length: 50},
    () =>
      `nav-content`,
  );

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataservice:DataService,
    private router: Router,private filterDataService:FilterDataService) {

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
    // this.subscription2 = this.filterDataService.currentMessage.subscribe(message => this.message = message)
  }

  toList():void{
    if (this.view == true){
      this.view = false;
      // let data=[{layout:'row'},{width:'250px'}]
      this.dataservice.changeMessage('row');
    }
    else {
      this.view = true;
      // let data=[{layout:'column'},{width:'500px'}]
      this.dataservice.changeMessage('column');
    } 
  }
  signOut(){
    console.log("logged out");
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }

  searchNote(event:any){
    this.search=event.target.value
    this.filterDataService.changeMessage(event.target.value)
  }
 
}
  
 
