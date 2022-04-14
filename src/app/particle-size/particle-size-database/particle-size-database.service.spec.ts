import { TestBed } from '@angular/core/testing';

import { ParticleSizeDatabaseService } from './particle-size-database.service';

describe('ParticleSizeDatabaseService', () => {
  let service: ParticleSizeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleSizeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
