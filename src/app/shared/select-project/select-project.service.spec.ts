import { TestBed } from '@angular/core/testing';

import { SelectProjectService } from './select-project.service';

describe('SelectProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectProjectService = TestBed.get(SelectProjectService);
    expect(service).toBeTruthy();
  });
});
