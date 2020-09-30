import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import { PostsService } from "../posts.service";
import { Post } from '../post.model';
import {mimeType} from "./mime-type.validator";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit, OnDestroy{
  // [ngModel]="post?.content"
  // *ngIf="title.invalid"
  // *ngIf="form.get('title').invalid"
  enteredTitle = "";
  enteredContent = "";
  private mode="create";
  private postId:string;
  form:FormGroup;
  post:Post;
  isLoading=false;
 imagePreview : string;
  private authStatusSub: Subscription;



  constructor(private authService:AuthService, public postsService: PostsService,public route:ActivatedRoute) {}

  ngOnDestroy(): void {
    // throw new Error("Method not implemented.");
    this.authStatusSub.unsubscribe();
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });


    this.form=new FormGroup({
title:new FormControl(null,{validators:[Validators.required, Validators.minLength(3)]}),
content:new FormControl(null, {validators:[Validators.required]}),
image:new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]
})
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('postId'))
      {
        this.mode="edit";
        this.postId=paramMap.get('postId');

        this.isLoading=true;
        this.postsService.getPost(this.postId).subscribe(postData=>{
          this.isLoading=false;
          this.post={
            id:postData._id,
            title:postData.title,
            content:postData.content,
            imagePath:postData.imagePath,
            creator:postData.creator
          };
          // console.log(postData);

          this.form.setValue({
            title:this.post.title,
             content:this.post.content,
             image:this.post.imagePath
          });
        });


      }
      else{
        this.mode="create";
        this.postId=null;
      }
    });
  }

  onAddPost() {

    if (this.form.invalid) {
      return;
    }
    if(this.mode==="create")
    {
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
      // console.log("create");
    }
    else
    {
      // console.log(this.postId,form.value.title, form.value.content);
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content, this.form.value.image);

    }
    this.form.reset();

  }

  onImagePicked(event:Event)
  {
const file=(event.target as HTMLInputElement).files[0];
this.form.patchValue({image:file});
this.form.get('image').updateValueAndValidity();
const reader=new FileReader();
reader.onload=()=>{
  this.imagePreview=reader.result as string;

};
reader.readAsDataURL(file);
console.log(file);
//  console.log(this.form);
  }
}
