import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

import { PostsComponent } from './search-posts.component';

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
const mockedNoPosts: Post[] = [];

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;

  let fakePostService: PostService;

  beforeEach(async () => {

    // Create fake service
    fakePostService = jasmine.createSpyObj<PostService>(
      'PostService',
      {
        getPosts: of(mockedPosts),
        getPostsByUser: of(mockedNoPosts)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ { provide: PostService, useValue: fakePostService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create with posts mocked', () => {
    expect(component).toBeTruthy();
    expect(component.posts).toEqual(mockedPosts);
    expect(component.readyToShow).toBeTrue();
  });

  it('should filter posts without user ID provided as null value (ngOnInit common function)', () => {

    // Modifying the spy method for getting posts on ngOnInit (for different scenario as mocked response)
    fakePostService.getPosts = jasmine.createSpy().and.returnValue(of(mockedNoPosts));

    fixture.detectChanges();
    component.filterPostsByUser(null);

    expect(component.posts).toHaveSize(0);
    expect(component.readyToShow).toBeTrue();
  });

  it('should filter posts without user ID provided as empty value (ngOnInit common function)', () => {
    component.filterPostsByUser('');

    expect(component.posts).toEqual(mockedPosts);
    expect(component.readyToShow).toBeTrue();
  });

  it('should filter posts with user ID provided', () => {
    component.filterPostsByUser('12');

    expect(component.posts).toEqual(mockedNoPosts);
    expect(component.readyToShow).toBeTrue();
  });
});
