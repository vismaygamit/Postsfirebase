import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
kind:string;
idToken:string;
email:string;
refreshToken:string;
expiresIn:string;
localId:string;
registered? : boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signup(email:string, password:string)
  {
return this.http.post<AuthResponseData>('https://securetoken.googleapis.com/v1/token?key',
{
email:email,
password:password,
returnSecureToken:true

}

);
  }

  login(email:string, password:string)
  {
return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
{
email:email,
password:password,
returnSecureToken:true

}

);
  }

deletepost()
{

}


}
