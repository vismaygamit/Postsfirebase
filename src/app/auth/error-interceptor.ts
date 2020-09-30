import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "../error/error.component";


import { ErrorService } from '../error/error.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
  constructor(private dialog: MatDialog, private errorService: ErrorService){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    // const authToken=this.authService.getToken();
    // const authRequest=req.clone({
    //   headers:req.headers.set("Authorization","Bearer " + authToken)
    // });
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
      // console.log(error);
      // alert(error.error.error.message);
      // Swal.fire({
      //   title: 'Oops!',
      //   text: 'Something went wrong!',
      //   icon: 'error',

      // });
      let errorMessage = "An unknown error occurred!";
      if (error.error.message) {
        errorMessage = error.error.message;
      }
      this.dialog.open(ErrorComponent, {data: {message: errorMessage}});
      // this.errorService.throwError(errorMessage);

      return throwError(error);
      })
    );
  }

}
