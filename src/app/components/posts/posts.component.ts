import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post';
import { PostService } from './posts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  //posts : IPost = new IPost();
  posts:any;
  post: IPost = new IPost();

  createForm!: FormGroup;

  showAdd!: boolean;
  showUpdate!: boolean;


  constructor(private postService: PostService) { }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      title: new FormControl('', 
      [
        Validators.required
      ]),
      author: new FormControl('', Validators.required),
    });

    this.getAllPosts();
  }

  onSubmit() {
    console.log(this.createForm.value);
  }

  clickAddPost(){
    this.createForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postPostDetails(){
    this.post.id = Math.floor(Math.random());
    if(this.posts.length > 0){
      this.posts.forEach((e:any) => {
        if(this.post.id == e.id){
          this.post.id = Math.floor(Math.random());
        }
      })
    }
    this.post.title = this.createForm.value.title;
    this.post.author = this.createForm.value.author;
  
    this.postService.postPost(this.post).subscribe(res => {
      console.log(res);
      alert("Added successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.createForm.reset();
      this.getAllPosts();
    },
    error => {
      alert("Something Wrong!!")
    })
  }

  getAllPosts(){
    this.postService.getPosts().subscribe((data:any) => {
      this.posts = data;
      return this.posts;
    })
  }

  deletePost(post: any){
    this.postService.deletePost(post.id).subscribe(res => {
      alert("Post has been deleted!!!");
      this.getAllPosts();
    })
  }

  onEdit(post: any){
    this.showAdd = false;
    this.showUpdate = true;

    this.post.id = post.id;
    this.createForm.controls['title'].setValue(post.title);
    this.createForm.controls['author'].setValue(post.author);
    
  }

  updatePostDetails(){
    this.post.title = this.createForm.value.title;
    this.post.author = this.createForm.value.author;

    this.postService.updatePost(this.post, this.post.id).subscribe(res => {
      console.log(res)
      alert("updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.createForm.reset();
      this.getAllPosts();
    })
  }

}
