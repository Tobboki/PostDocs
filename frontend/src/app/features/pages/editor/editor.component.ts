import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/interfaces/user.interface';
import { Post } from '../../../core/interfaces/post.interface';
import { Comment } from '../../../core/interfaces/comment.interface';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent implements OnInit{
  users: User[] = [];
  posts: Post[] = [];
  comments: Comment[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
    });

    this.apiService.getComments().subscribe((data) => {
      this.comments = data
    });
  }
}
