import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
isLoading=false;
private authStatusSub: Subscription;
  constructor(public authService:AuthService ) { }
  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe(
    authStatus=>{
      this.isLoading=false;
    });
  }

  onLogin(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.isLoading=true;
    this.authService.login(form.value.email,form.value.password);
    // console.log(this.authService.login(form.value.email,form.value.password));
    // const un=form.value.email;
    // const pass=form.value.password;
    // console.log("un"+un+ "password"+pass);
  }

}
