import { TestBed, inject } from '@angular/core/testing';

import { SteelService } from './steel.service';

describe('SteelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SteelService]
    });
  });

  it('should be created', inject([SteelService], (service: SteelService) => {
    expect(service).toBeTruthy();
  }));
});
