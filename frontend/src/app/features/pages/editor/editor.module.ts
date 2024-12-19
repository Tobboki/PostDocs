import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostsComponent } from './posts/posts.component';
import { UserCardComponent } from './user-card/user-card.component';
import { EditorComponent } from './editor.component';
import { UsersComponent } from './users/users.component';
import { CommentsComponent } from './comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsComponent,
    PostCardComponent,
    UserCardComponent,
    CommentCardComponent,
    EditorComponent,
    UsersComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }
