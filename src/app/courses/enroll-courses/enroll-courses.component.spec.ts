import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCoursesComponent } from './enroll-courses.component';

describe('EnrollCoursesComponent', () => {
  let component: EnrollCoursesComponent;
  let fixture: ComponentFixture<EnrollCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
