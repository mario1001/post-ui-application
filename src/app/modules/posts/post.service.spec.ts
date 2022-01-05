import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Post } from './post.model';

import { PostService } from './post.service';

const expectedUrl = 'https://jsonplaceholder.typicode.com/posts'
const expectedUrlFilter = 'https://jsonplaceholder.typicode.com/posts?userId=1'
const expectedUrlDetail = 'https://jsonplaceholder.typicode.com/posts/1'
const mockedPosts = [{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
},
{
  "userId": 1,
  "id": 2,
  "title": "qui est esse",
  "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}];

const status = 500;
const statusText = 'Internal Server Error';
const errorEvent = new ProgressEvent('API error');

describe('PostService', () => {
  let service: PostService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get posts with fake API response', () => {
    let posts: Post[] | undefined;
    service.getPosts().subscribe(data => {
      posts = data;
    });

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value.
    request.flush(mockedPosts);

    // Now verify emitted valued.
    expect(posts).toEqual(mockedPosts);
  });

  it('should not get posts with fake error API response (ending with empty list by service)', () => {
    let posts: Post[] | undefined;
    service.getPosts().subscribe(
      (data) => {
        // Receiving here empty list (checking down)
        posts = data;
      }
    );

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value.

    request.error(
      errorEvent,
      { status, statusText }
    );

    // Now verify emitted valued.
    expect(posts).toEqual([]);
  });

  it('should get posts filtered by user ID with fake API response', () => {
    let posts: Post[] | undefined;
    service.getPostsByUser(1).subscribe(data => {
      posts = data;
    });

    const request = controller.expectOne(expectedUrlFilter);
    // Answer the request so the Observable emits a value.
    request.flush(mockedPosts);

    // Now verify emitted valued.
    expect(posts).toEqual(mockedPosts);
  });

  it('should not get posts filtered by user ID with fake error API response (ending with empty list by service)', () => {
    let posts: Post[] | undefined;
    service.getPostsByUser(1).subscribe(
      (data) => {
        // Receiving here empty list (checking down)
        posts = data;
      }
    );

    const request = controller.expectOne(expectedUrlFilter);
    // Answer the request so the Observable emits a value.

    request.error(
      errorEvent,
      { status, statusText }
    );

    // Now verify emitted valued.
    expect(posts).toEqual([]);
  });

  it('should check post detail with fake API response', () => {
    let post: Post | undefined;
    service.getPost(1).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrlDetail);
    // Answer the request so the Observable emits a value.
    request.flush(mockedPosts[0]);

    // Now verify emitted valued.
    expect(post).toEqual(mockedPosts[0]);
  });

  it('should check post detail with fake error API response (ending with undefined value)', () => {
    let post: Post | undefined;
    service.getPost(1).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrlDetail);
    // Answer the request so the Observable emits a value.

    request.error(
      errorEvent,
      { status, statusText }
    );

    // Now verify emitted valued.
    expect(post).toBeUndefined();
  });

  it('should add a post with fake API response', () => {
    let post: Post | undefined;
    service.addPost(<Post> {
      "userId": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value.
    request.flush(mockedPosts[0]);

    // Now verify emitted valued.
    expect(post).toEqual(mockedPosts[0]);
  });

  it('should add a post with fake error API response (ending with undefined value)', () => {
    let post: Post | undefined;

    // Adding a post with ID passed (should never work that way, ID is generated by API)
    // That's why this will raise an error here in this use case
    service.addPost(<Post> mockedPosts[0]).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrl);
    // Answer the request so the Observable emits a value.

    request.error(
      errorEvent,
      { status, statusText }
    );

    // Now verify emitted valued.
    expect(post).toBeUndefined();
  });

  it('should update a post with fake API response', () => {
    let post: Post | undefined;
    service.updatePost(<Post> mockedPosts[0]).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrlDetail);
    // Answer the request so the Observable emits a value.
    request.flush(mockedPosts[0]);

    // Now verify emitted valued.
    expect(post).toEqual(mockedPosts[0]);
  });

  it('should update a post with fake error API response (ending with undefined value)', () => {
    let post: Post | undefined;

    service.updatePost(<Post> {
      "id": 1,
      "userId": 500,
      "title": "qui est esse",
      "body": "est rerum tempore vitae"
    }).subscribe(data => {
      post = data;
    });

    const request = controller.expectOne(expectedUrlDetail);
    // Answer the request so the Observable emits a value.

    request.error(
      errorEvent,
      { status, statusText }
    );

    // Now verify emitted valued.
    expect(post).toBeUndefined();
  });
});
