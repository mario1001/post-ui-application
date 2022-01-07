import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/modules/posts/post.model';
import { PostService } from 'src/app/modules/posts/post.service';

import { BlackFormComponent } from './black-form.component';

const mockedPostToShow: Post = {
  "userId": 5,
  "id": 101,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur"
}

describe('BlackFormComponent', () => {
  let component: BlackFormComponent;
  let fixture: ComponentFixture<BlackFormComponent>;

  let fakePostService;

  beforeEach(async () => {

    // Create fake
    fakePostService = {dataReflected: {subscribe: jasmine.createSpy('test')}};

    await TestBed.configureTestingModule({
      declarations: [ BlackFormComponent ],
      providers: [ { provide: PostService, useValue: fakePostService } ]
    })
    .compileComponents();
  });

  it('should create the black form component and subscribe the data received', () => {

    fixture = TestBed.createComponent(BlackFormComponent);
    component = fixture.componentInstance;
    component.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),

      // We do not really know the default user ID for this case (setting here 1 for now)
      userId: new FormControl(1)
    });

    fixture.detectChanges();

    expect(component).toBeTruthy();
    //expect(component.data).toEqual(mockedPostToShow);
    expect(component.inputs).toEqual(['title', 'body', 'userId']);
  });
});
