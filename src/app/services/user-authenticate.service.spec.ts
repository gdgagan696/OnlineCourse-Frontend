import { TestBed } from '@angular/core/testing';

import { UserAuthenticateService } from './user-authenticate.service';

describe('UserAuthenticateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAuthenticateService = TestBed.get(UserAuthenticateService);
    expect(service).toBeTruthy();
  });
});
