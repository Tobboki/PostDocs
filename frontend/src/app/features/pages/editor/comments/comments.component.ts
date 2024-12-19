import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../../core/interfaces/comment.interface';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/interfaces/user.interface';
import { Post } from '../../../../core/interfaces/post.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  comments: Comment[] = [];
  
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getComments().subscribe((data) => {
      this.comments = data
    });
  }

}
