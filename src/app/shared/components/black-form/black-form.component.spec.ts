import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/modules/posts/post.service';

import { BlackFormComponent } from './black-form.component';

describe('BlackFormComponent', () => {
  let component: BlackFormComponent;
  let fixture: ComponentFixture<BlackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackFormComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PostService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackFormComponent);
    component = fixture.componentInstance;
    component.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),

      // We do not really know the default user ID for this case (setting here 1 for now)
      userId: new FormControl(1)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
