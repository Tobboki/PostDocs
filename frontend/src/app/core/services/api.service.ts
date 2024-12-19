import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { Comment } from '../interfaces/comment.interface';
import { Photo } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl;
  private endpoints = environment.dataEndpoints;

  constructor(private http: HttpClient) {}

  // ----------- POSTS -----------
  getPosts(userId?: number): Observable<Post[]> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('user_id', userId.toString());
    }
    return this.http.get<Post[]>(`${this.baseUrl}${this.endpoints.posts}`, { params });
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}${this.endpoints.posts}${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}${this.endpoints.posts}`, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}${this.endpoints.posts}${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endpoints.posts}${id}`);
  }

  // ----------- USERS -----------
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}${this.endpoints.users}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${this.endpoints.users}${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}${this.endpoints.users}`, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${this.endpoints.users}${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endpoints.users}${id}`);
  }

  // ----------- COMMENTS -----------
  getComments(userId?: number): Observable<Comment[]> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('user_id', userId.toString());
    }
    return this.http.get<Comment[]>(`${this.baseUrl}${this.endpoints.comments}`, { params });
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}${this.endpoints.comments}${id}`);
  }

  createComment(comment: {content: string, post: number, user: number}): Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}${this.endpoints.comments}`, comment);
  }

  updateComment(id: number, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.baseUrl}${this.endpoints.comments}${id}`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endpoints.comments}${id}`);
  }

  // ----------- PHOTOS -----------
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl}${this.endpoints.photos}`);
  }

  getPhotoById(id: number): Observable<Photo> {
    return this.http.get<Photo>(`${this.baseUrl}${this.endpoints.photos}${id}`);
  }

  createPhoto(photo: Photo): Observable<Photo> {
    return this.http.post<Photo>(`${this.baseUrl}${this.endpoints.photos}`, photo);
  }

  updatePhoto(id: number, photo: Photo): Observable<Photo> {
    return this.http.put<Photo>(`${this.baseUrl}${this.endpoints.photos}${id}`, photo);
  }

  deletePhoto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endpoints.photos}${id}`);
  }
}