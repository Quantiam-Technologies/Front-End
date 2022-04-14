import { TestBed } from '@angular/core/testing';

import { SelectSampleService } from './select-sample.service';

describe('SelectSampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectSampleService = TestBed.get(SelectSampleService);
    expect(service).toBeTruthy();
  });
});
