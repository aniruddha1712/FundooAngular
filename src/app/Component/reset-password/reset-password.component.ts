import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm !: FormGroup;

  constructor(private fb:FormBuilder, private user:UserService) { }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmpassword:['',[Validators.required,Validators.minLength(8)]],
    })
  }
  onSubmit(){
    if(this.resetForm.valid){
      console.log("valid data", this.resetForm.value);
      console.log("do api call");

      let data={
        Email:this.resetForm.value.email,
        Password:this.resetForm.value.password
      }
      this.user.resetpass(data).subscribe((res:any)=>{
        console.log(res);
      })
    }
    else{
      console.log("invalid data",this.resetForm.value);
      console.log("no api call");
    }

  }
}
