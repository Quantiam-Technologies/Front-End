import { TestBed } from '@angular/core/testing';

import { SemRunService } from './sem-run.service';

describe('SemRunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemRunService = TestBed.get(SemRunService);
    expect(service).toBeTruthy();
  });
});
