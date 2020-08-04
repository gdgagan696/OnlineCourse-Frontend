import { TestBed } from '@angular/core/testing';

import { UserCoursesService } from './usercourses.service';

describe('UserCoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCoursesService = TestBed.get(UserCoursesService);
    expect(service).toBeTruthy();
  });
});
