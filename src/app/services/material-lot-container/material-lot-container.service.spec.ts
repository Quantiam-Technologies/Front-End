import { TestBed, inject } from '@angular/core/testing';

import { MaterialLotContainerService } from './material-lot-container.service';

describe('MaterialLotContainerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialLotContainerService]
    });
  });

  it('should be created', inject([MaterialLotContainerService], (service: MaterialLotContainerService) => {
    expect(service).toBeTruthy();
  }));
});
