import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;

  constructor( private fb:FormBuilder, private user:UserService,private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log("valid data", this.loginForm.value);
      console.log("do api call");

      let data={
        Email:this.loginForm.value.email,
        Password:this.loginForm.value.password
      }
      this.user.login(data).subscribe((res:any)=>{
        console.log(res.Token);
        localStorage.setItem('token',res.Token);
        this.router.navigateByUrl('/dashboard/notes');
      });
      this.snackBar.open('Logged in successfully','', {
        duration: 3000,
        verticalPosition: 'bottom'
      });
    }
    else{
      console.log("invalid data",this.loginForm.value);
      console.log("no api call");
    }

  }
}
