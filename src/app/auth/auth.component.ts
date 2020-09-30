import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

isLoginMode=true;
  constructor(private authService:AuthService) { }

  onSwitchMode()
  {
this.isLoginMode=!this.isLoginMode;
  }
  ngOnInit(): void {
  }

  onSubmit(form:NgForm)
  {
    if(!form.valid)
    {
      return;
    }
    // if(this.isLoginMode)
    // {

    // }
    // else
    // {
      console.log(form);
const email=form.value.email;
const password=form.value.password;
this.authService.signup(email,password).subscribe(
  resData=>{
console.log(resData);
},
error=>{
  console.log(error);
}
);
    // }

// form.reset();
  }

}
