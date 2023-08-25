import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPost } from 'src/app/models/post';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable()
export class PostService {

  private url: string = "http://localhost:3000/posts";  
  constructor(private http: HttpClient) { }

  /*getPosts(): Observable<IPost[]>{
    return this.http.get<IPost[]>(this.url)
  }*/
  
  getPosts(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postPost(data:any){
    return this.http.post<any>(this.url, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updatePost(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deletePost(id: number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}