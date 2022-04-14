import { TestBed } from '@angular/core/testing';

import { SelectPermissionService } from './select-permission.service';

describe('SelectPermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectPermissionService = TestBed.get(SelectPermissionService);
    expect(service).toBeTruthy();
  });
});
