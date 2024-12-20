import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../../../core/interfaces/comment.interface';
import { ApiService } from '../../../../core/services/api.service';
import { User } from '../../../../core/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../../core/interfaces/post.interface';
import { AvatarService } from '../../../../core/services/avatar.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent implements OnInit{
  @Input() comment!: Comment;
  commentUser!: User;
  userAvatarUrl: string = '';
  commentPost!: Post;
  editCommentForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private avatarService: AvatarService
  ) {
    this.editCommentForm = this.formBuilder.group({
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
  }

  ngOnInit(): void {
    if (this.comment.id) {
      this.apiService.getUserById(this.comment.id).subscribe((data) => {
        this.commentUser = data
      });

      this.apiService.getPostById(this.comment.id).subscribe((data) => {
        this.commentPost = data
      });
    }

    if (this.commentUser) {
      const username = this.commentUser.firstname.toString() + this.commentUser.lastname.toString()
      this.userAvatarUrl = this.avatarService.generateAvatar(username);
    }
  }

  editComment(id: number) {
    const commentUpdatedData: Comment = this.editCommentForm.value;
    this.apiService.updateComment(id, commentUpdatedData).subscribe({
      next: (response) => {
        console.log('Comment updated successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while updating comment:', err);
      },
      complete: () => {
        console.log('Comment update completed.');
      }
    });
  }
  
  deleteComment(id: number) {
    this.apiService.deleteComment(id).subscribe({
      next: (response) => {
        console.log('Comment deleted successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while deleting comment:', err);
      },
      complete: () => {
        console.log('Comment deletion completed.');
      }
    });
  }
}
