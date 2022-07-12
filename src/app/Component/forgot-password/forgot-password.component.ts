import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgetForm !: FormGroup;

  constructor(private fb:FormBuilder, private user:UserService) { }

  ngOnInit(): void {
    this.forgetForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
    })
  }
  
  onSubmit(){
    if(this.forgetForm.valid){
      console.log("valid data", this.forgetForm.value);
      console.log("do api call");

      let data={
        email:this.forgetForm.value.email
      }
      this.user.forgotpass(data).subscribe((res:any)=>{
        console.log(res);
      })
    }
    else{
      console.log("invalid data",this.forgetForm.value);
      console.log("no api call");
    }

  }
}


