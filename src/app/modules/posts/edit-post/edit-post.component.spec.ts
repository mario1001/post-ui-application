import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostService } from '../post.service';

import { EditPostComponent } from './edit-post.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { Post } from '../post.model';
import { ActivatedRoute } from '@angular/router';

const mockedPostUpdated = {
  "userId": 5,
  "id": 5,
  "title": "test",
  "body": "test"
}
const mockedPostDetail = {
  "userId": 5,
  "id": 5,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur"
}

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  let fakePostService: PostService;
  let fakeActivatedRoute: object;

  beforeEach(() => {

    // Create fake
    fakePostService = jasmine.createSpyObj<PostService>(
      'PostService',
      {
        getPost: of(mockedPostDetail),
        updatePost: of(mockedPostUpdated)
      },
      {
        dataReflected: new EventEmitter<Post>()
      }
    );

    fakeActivatedRoute = {
      queryParams: of({id: 123})
    };
  });

  it('should create edit component with postId query param from url and call service layer', async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: PostService, useValue: fakePostService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    spyOn(fakePostService.dataReflected, 'emit');

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(fakePostService.dataReflected.emit).toHaveBeenCalled();
    expect(component.post).toEqual(mockedPostDetail);
  });

  it('should create edit component without any query param (no post indicated and for now empty functionality)', async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: PostService, useValue: fakePostService },
        { provide: ActivatedRoute, useValue: {
          queryParams: of({})
        }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.post).toBeUndefined();
  });

  it('should run onSubmit function with success', async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: PostService, useValue: fakePostService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    component.post = mockedPostUpdated;
    spyOn(fakePostService.dataReflected, 'emit');

    fixture.detectChanges();
    component.onSubmit(mockedPostUpdated);

    expect(component).toBeTruthy();
    expect(fakePostService.dataReflected.emit).toHaveBeenCalled();
  });
});
