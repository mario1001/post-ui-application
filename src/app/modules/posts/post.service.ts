import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  // Not configured in environments because this value would not vary at all
  private postsUrl = 'https://jsonplaceholder.typicode.com';  // Static URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  };

  // This data will be up when requests are made for modal as information provided by API
  // Should be updated with subject instead of event emitter (to be done for now)
  dataReflected = new Subject<Post>();

  constructor(private http: HttpClient) {}

  /** GET posts from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl + '/posts', this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  /** GET posts with user ID filter from the server */
  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl + `/posts?userId=${userId}`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched posts with user filter')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  /** GET post from the server (providing ID) */
  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.postsUrl + `/posts/${postId}`, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetch post')),
        catchError(this.handleError<Post>('getPost'))
      );
  }

  /**
   * POST: add a new post to the server (faked as documented in API)
   */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl + '/posts', post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added new post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  /**
   * PUT: update an existing post (should contain the ID for identifying and faked again as documented in API)
   */
   updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.postsUrl + `/posts/${post.id}`, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`update existing post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('updatePost'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`PostService: ${message}`);
  }
}
