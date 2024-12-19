import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Post } from '../../../../core/interfaces/post.interface';
import { User } from '../../../../core/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  standalone: false
})
export class PostsComponent implements OnInit{
  posts: Post[] = [];
  users: User[] = [];
  createPostForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.createPostForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(128),
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]],
      user:['', [
        Validators.required,
        Validators.min(1),
      ]]
    });
  }

  ngOnInit(): void {
    this.apiService.getPosts().subscribe((data) => {
      this.posts = data;
    });

    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  createPost() {
    const postData: Post = this.createPostForm.value;
    this.apiService.createPost(postData).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
      },
      error: (err) => {
        console.error('Error occurred while creating post:', err);
      },
      complete: () => {
        console.log('Post creation completed.');
      }
    });
  }
}
