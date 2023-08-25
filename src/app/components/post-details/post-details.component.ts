import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../posts/posts.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  post:any;
  posts:any;

  constructor(
    private route: ActivatedRoute, 
    private postService: PostService,  
    private location: Location) { }

  ngOnInit(): void {
    
    this.postService.getPosts().subscribe((data:any) => {
      this.posts = data;
      this.post = this.posts.find((a:any) => a.id == this.route.snapshot.params['id'])
      return this.post;
    })

   
  }

  goBack(): void{
    this.location.back();
  }

}
