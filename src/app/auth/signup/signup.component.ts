import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  isLoading=false;
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe(
    authStatus =>{
      this.isLoading=false;
    });
  }

  onSignup(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.isLoading=true;
    this.authService.createUser(form.value.email,form.value.password);
    // console.log(form);
    // const un=form.value.email;
    // const pass=form.value.password;
    // console.log("un"+un+ "password"+pass);
    this.isLoading=false;
  }

  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }

}
