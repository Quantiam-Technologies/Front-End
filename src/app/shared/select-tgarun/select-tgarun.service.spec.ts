import { TestBed } from '@angular/core/testing';

import { SelectTgarunService } from './select-tgarun.service';

describe('SelectTgarunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectTgarunService = TestBed.get(SelectTgarunService);
    expect(service).toBeTruthy();
  });
});
