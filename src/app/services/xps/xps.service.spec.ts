import { TestBed, inject } from '@angular/core/testing';

import { XpsServiceService } from './xps-service.service';

describe('XpsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XpsServiceService]
    });
  });

  it('should be created', inject([XpsServiceService], (service: XpsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
