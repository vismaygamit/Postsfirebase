import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Post } from "./post.model";
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

const BACKEND_URL=environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts:Post[], postCount:number}>();

  constructor(private http: HttpClient, private router:Router) {}

  getPosts(postsPerPage:number, currentPage:number) {
    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string; posts: any, maxPosts:number }>(
      BACKEND_URL + queryParams
    )
    .pipe(
      map(postData => {
        return {
          posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath:post.imagePath,
          creator:post.creator
        };
      }), maxPosts:postData.maxPosts};
    }))
    .subscribe(transformedPostData => {
      this.posts = transformedPostData.posts;
      this.postsUpdated.next({
        posts:[...this.posts],
        postCount:transformedPostData.maxPosts
      });
    });

  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, image:File) {
    // const post: Post = { id: null, title: title, content: content };
    const postData=new FormData();
    postData.append("title",title);
    postData.append("content",content);
    postData.append("image",image, title);
    this.http
      .post<{ message: string, post: Post }>(BACKEND_URL, postData)
      .subscribe(responseData => {
        // console.log(responseData.message);
        // const post: Post ={
        //   id:responseData.post.id,
        //    title:title,
        //     content:content,
        //    imagePath:responseData.post.imagePath};
        // const id=responseData.post.id;
        // post.id=id;
        // this.posts.push(post);

        Swal.fire({
          title: 'Success!',
          text: responseData.message,
          icon: 'success',
        });
        this.router.navigate(["displayposts"]);

      });
        // console.log(responseData);
      // });

  }

  deletePost(postId: string) {
    // const post: Post = { id: Number };
    // console.log("Deleted id"+postId);
      return this.http
      .delete(BACKEND_URL + postId);
      // console.log(delete_status);
      // // .subscribe(response=> {
      //   const updatedPosts=this.posts.filter(post=>post.id!==postId);
      //   this.posts=updatedPosts;
      //   this.postsUpdated.next([...this.posts]);
      //   // console.log(responseData.message);
      //   console.log("Deleted");
      //   // this.posts.push(post);
      //   // this.postsUpdated.next([...this.posts]);
      //
        // console.log(response);
      // });

  }

  getPost(id:string)
  {
    return this.http.get<{_id:string; title:string; content:string; imagePath:string; creator:string;}>(
      BACKEND_URL + id);
    // {...this.posts.find(p=>p.id===id)};
  }

  updatePost(id:string,title:string,content:string,image:File | string)
  {
    console.log("inside updatepost");
    let postData: Post | FormData;
    if(typeof image==="object")
    {
      postData=new FormData();
      postData.append("id",id);
      postData.append("title",title);
      postData.append("content",content);
      postData.append("image",image,title);

    }
    else
    {
      postData={id:id, title:title,content:content,imagePath:image,creator:null}
    }
    // const postData=new FormData();
    // postData.append("title",title);
    // postData.append("content",content);
    // postData.append("image",image, title);
    // console.log("edit"+id+"title"+title+"content"+content);
  // const post: Post={id:id, title:title, content:content};
  this.http.put<{message: string}>(BACKEND_URL + id,postData)
  .subscribe(response=>{
    // const updatedPosts=[...this.posts];
    // const oldPostIndex=updatedPosts.findIndex(p=>p.id===id);
    // const post: Post={
    //   id:id,
    //   title:title,
    //   content:content,
    //   imagePath:""
    // };
    // updatedPosts[oldPostIndex] = post;
    //     this.posts = updatedPosts;
    //     this.postsUpdated.next([...this.posts]);
    Swal.fire({
      title: 'Success!',
      text: response.message,
      icon: 'success',
    });
    // console.log(response);
    this.router.navigate(["displayposts"]);
  });
  }
}
