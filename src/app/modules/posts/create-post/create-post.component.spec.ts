import { PostService } from './../post.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostComponent } from './create-post.component';
import { of } from 'rxjs';
import { Post } from '../post.model';
import { EventEmitter } from '@angular/core';

const mockedPostAdded = {
  "userId": 5,
  "id": 101,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur"
}

describe('CreatePostComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;

  let fakePostService: PostService;

  beforeEach(async () => {

    // Create fake
    fakePostService = jasmine.createSpyObj<PostService>(
      'PostService',
      {
        addPost: of(mockedPostAdded)
      },
      {
        dataReflected: new EventEmitter<Post>()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ CreatePostComponent ],
      providers: [ { provide: PostService, useValue: fakePostService } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run submit function on this component (with mocked service)', () => {
    spyOn(fakePostService.dataReflected, 'emit');

    component.onSubmit(<Post>{
      "userId": 5,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur"
    });
    fixture.detectChanges();

    expect(fakePostService.dataReflected.emit).toHaveBeenCalled();
  });
});
