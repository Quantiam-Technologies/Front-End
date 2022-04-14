import { TestBed } from '@angular/core/testing';

import { ParticleSizeServiceService } from './particle-size-service.service';

describe('ParticleSizeServiceService', () => {
  let service: ParticleSizeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleSizeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
