import { TestBed, inject } from '@angular/core/testing';

import { MaterialLotService } from './material-lot.service';

describe('MaterialLotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialLotService]
    });
  });

  it('should be created', inject([MaterialLotService], (service: MaterialLotService) => {
    expect(service).toBeTruthy();
  }));
});
