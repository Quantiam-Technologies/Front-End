import { TestBed } from '@angular/core/testing';

import { SelectUserService } from './select-user.service';

describe('SelectUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectUserService = TestBed.get(SelectUserService);
    expect(service).toBeTruthy();
  });
});
