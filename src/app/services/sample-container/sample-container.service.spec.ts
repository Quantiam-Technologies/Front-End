import { TestBed, inject } from '@angular/core/testing';

import { SampleContainerService } from './sample-container.service';

describe('SampleContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleContainerService]
    });
  });

  it('should be created', inject([SampleContainerService], (service: SampleContainerService) => {
    expect(service).toBeTruthy();
  }));
});
