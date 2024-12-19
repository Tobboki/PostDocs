import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';
import { PostsComponent } from './posts/posts.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'comments', component: CommentsComponent },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
