import { Component, OnInit, OnDestroy } from "@angular/core";
import {PageEvent} from "@angular/material/paginator";
import { Subscription } from 'rxjs';

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
  posts: Post[] = [];
  isLoading=false;
  totalPosts=0;
  postsPerPage=2;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  userIsAuthenticated=false;
  userId:string;
  private postsSub: Subscription;
  private authStatusSub:Subscription;

  constructor(public postsService: PostsService, private authService:AuthService) {}

  ngOnInit() {
    // this.authListenerSubs=this.authService
    // .getAuthStatusListener()
    // .subscribe(isAuthenticated=>{
    //   this.userIsAuthenticated=isAuthenticated;
    // });
    this.isLoading=true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId=this.authService.getUserId();

    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });


    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSub=this.authService.getAuthStatusListener().subscribe(IsAuthenticated=>{
      this.userIsAuthenticated=IsAuthenticated;
      this.userId=this.authService.getUserId();
    });
 }

  onChangedPage(pageData: PageEvent)
  {

    console.log(pageData);
    this.isLoading=true;
    this.postsPerPage= pageData.pageSize;
    this.currentPage= pageData.pageIndex+1;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
// console.log(this.postsPerPage);
    // this.
  }
  onDelete(postId: string) {
    // this.postsService.deletePost(postId);


      Swal.fire({
        title: 'Are you sure want to delete?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.postsService.deletePost(postId).subscribe(response => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
      this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);

          });
        }
        else if(result.dismiss === Swal.DismissReason.cancel)
        {
          Swal.fire(
            'Cancelled',
            'Cancelled',
            'error'
          )
      // this.postsService.getPosts(this.postsPerPage, this.currentPage);

        }
      });
    // });



    // console.log(postId);
  }
  // display()
  // {
  //   this.postsService.getPosts(this.postsPerPage,this.currentPage);
  //   this.userId=this.authService.getUserId();
  //   this.postsSub = this.postsService.getPostUpdateListener()
  //     .subscribe((postData: {posts: Post[], postCount: number}) => {
  //       this.isLoading=false;
  //       this.totalPosts = postData.postCount;
  //       this.posts=postData.posts;
  //       // console.log(posts);
  //     });
  // }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}