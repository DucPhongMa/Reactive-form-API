import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostsComponent } from './components/posts/posts.component';
import { ReactiveformComponent } from './components/reactiveform/reactiveform.component';

const routes: Routes = [
  { path: 'register', component: ReactiveformComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
