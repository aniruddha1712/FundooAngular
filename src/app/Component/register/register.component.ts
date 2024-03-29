import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/userService/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup;

  public inputType:string = 'password';
  public showPass(event:any):void{
    if(event.target.checked){
      this.inputType = 'text';
    }
    else{
      this.inputType = 'password';
    }
  }

  constructor( private fb:FormBuilder, private user:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirm:['',Validators.required],
    })
  }
  
  onSubmit(){
    if(this.registerForm.valid){
      console.log("valid data", this.registerForm.value);
      console.log("do api call");

      let data={
        // UserId:0,
        FirstName:this.registerForm.value.firstname,
        LastName:this.registerForm.value.lastname,
        Email:this.registerForm.value.email,
        Password:this.registerForm.value.password
      }
      this.user.register(data).subscribe((res:any)=>{
        console.log(res);
      });
      this.snackBar.open('Registration successful','', {
        duration: 3000,
        verticalPosition: 'bottom'
      });
    }
    else{
      console.log("invalid data",this.registerForm.value);
      console.log("no api call");
    }
  }
}
