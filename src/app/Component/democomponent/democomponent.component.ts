import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-democomponent',
  templateUrl: './democomponent.component.html',
  styleUrls: ['./democomponent.component.scss']
})
export class DemocomponentComponent implements OnInit {

  constructor(private user:UserService) { }
  email!:'test1@gmail.com';
  password!:'Anni1234';

  ngOnInit(): void {
    this.email='test1@gmail.com';
    this.password='Anni1234';
  }
  onSubmit(){
    let data={
      Email:this.email,
      Password:this.password,
    }
    console.log("valid data", this.email," ",this.password);
    console.log("do api call");
    this.user.login(data).subscribe((res:any)=>{
      console.log(res);
    })
  }
}
