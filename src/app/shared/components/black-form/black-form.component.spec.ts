import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackFormComponent } from './black-form.component';

describe('BlackFormComponent', () => {
  let component: BlackFormComponent;
  let fixture: ComponentFixture<BlackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
