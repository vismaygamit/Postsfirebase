import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Post } from "../posts/post.model";
import { PostsService } from "../posts/posts.service";
import { Subscription } from 'rxjs';
// import { PostsService } from '../posts/posts.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.css']
})
export class FirebaseComponent implements OnInit {
// @ViewChild('postForm') postForm:NgForm;
error=new Subject<string>();
  constructor(private http:HttpClient, private postsService:PostsService) { }
loadedPosts=[];
isFetching=false;
// error=null;

posts: Post[] = [];
private postsSub: Subscription;

  ngOnInit(): void {
    this.isFetching=true;
    // this.postsService.getPosts();
    // this.postsSub = this.postsService.getPostUpdateListener()
    //   .subscribe((posts: Post[]) => {
    //     this.posts = posts;
    //     console.log(posts);
    //   });

//     this.postsService.fetchPosts().subscribe(posts =>{
// this.isFetching=false;
// this.loadedPosts=posts;
//     }, error=>{
//       this.error.next(error.message);
//     });

  }
//   onSubmit(form:NgForm)
//   {
// console.log(form);
//   }
onCreatePost(postData: {title:string; content:string})
  {
    // this.postsService.createAndStorePost(postData.title,postData.content);
  }

  onFetchPosts()
  {
//     this.isFetching=true;
//     this.postsService.fetchPosts().subscribe(posts =>{
// this.isFetching=false;
// this.loadedPosts=posts;
//     }, error=>{
//       this.error.next(error.message);
//     });
    // const data=this.postsService.getPosts();
    // console.log(this.posts);
  }
  // private fetchPosts()
  // {
  //   this.isFetching=true;

    // console.log("inside fetchpost");
     //   this.isFetching=false;
    //   this.loadedPosts=posts;
    // console.log(this.loadedPosts);

  // }

  onclearPosts()
  {
// this.postsService.deletepost().subscribe(()=>{
  this.loadedPosts=[];
// });
  }
}
