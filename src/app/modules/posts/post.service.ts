import { Post } from './post.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  data = new EventEmitter<Post>();

  constructor(private http: HttpClient) {}

  /** GET posts from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl + '/posts')
      .pipe(
        tap(_ => this.log('fetched posts')),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }

  /**
   * POST: add a new post to the server (faked as documented in API)
   */
  addPost(post: Post): Observable<Post> {
    console.log(post);
    return this.http.post<Post>(this.postsUrl + '/posts', post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added new post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  /**
   * PUT: update an existing post (should contain the ID for identifying and faked again as documented in API)
   */
   updatePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl + `/posts/${post.id}`, post, this.httpOptions).pipe(
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`PostService: ${message}`);
  }
}
