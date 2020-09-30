import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirebaseComponent } from './firebase/firebase.component';
import { AuthComponent } from './auth/auth.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'firedemo',component:FirebaseComponent},
  {path:'auth',component:AuthComponent},
  {path:'displayposts',component:PostListComponent},
  {path:'addpost',component:PostCreateComponent, canActivate:[AuthGuard]},
  {path:'edit/:postId',component:PostCreateComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
