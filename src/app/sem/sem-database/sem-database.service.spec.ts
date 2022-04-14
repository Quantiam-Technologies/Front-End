import { TestBed } from '@angular/core/testing';

import { SemDatabaseService } from './sem-database.service';

describe('SemDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemDatabaseService = TestBed.get(SemDatabaseService);
    expect(service).toBeTruthy();
  });
});
