import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { Post } from '../../../../core/interfaces/post.interface';
import { Comment } from '../../../../core/interfaces/comment.interface';
import { User } from '../../../../core/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../../../../core/services/avatar.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit{
  @Input() post!: Post;
  postUser!: User;
  users: User[] = [];
  userAvatarUrl: string = '';
  postComments: Comment[] = [];
  editPostForm: FormGroup;
  createCommentForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private avatarService: AvatarService
  ) {
    this.editPostForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      user: ['', [
        Validators.required,
        Validators.min(1)
      ]]
    });

    this.createCommentForm = this.formBuilder.group({
      content: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]],
      user: ['', [
        Validators.required,
        Validators.min(1)
      ]] 
    });

  }

  ngOnInit(): void {
    this.apiService.getComments(this.post.id).subscribe((data) => {
      this.postComments = data
    });

    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.apiService.getUserById(this.post.user).subscribe((data) => {
      this.postUser = data;
    });

    if (this.postUser) {
      const username = this.postUser.firstname.toString() + this.postUser.lastname.toString()
      this.userAvatarUrl = this.avatarService.generateAvatar(username);
    }

  }

  createComment(post: number) {
    const {content , user} = this.createCommentForm.value;
    const commentData = {content, post, user};
    this.apiService.createComment(commentData).subscribe({
      next: (response) => {
        console.log('Comment created successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while creating comment:', err);
      },
      complete: () => {
        console.log('Comment creation completed.');
      }
    });
  }

  editPost(id: number) {
    const postUpdatedData = this.editPostForm.value;
    this.apiService.updatePost(id, postUpdatedData).subscribe({
      next: (response) => {
        console.log('Post updated successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while updating post:', err);
      },
      complete: () => {
        console.log('Post update completed.');
      }
    });
  }

  deletePost(id: number) {
    this.apiService.deletePost(id).subscribe({
      next: (response) => {
        console.log('Post deleted successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while deleting post:', err);
      },
      complete: () => {
        console.log('Post deletion completed.');
      }
    });
  }

}
