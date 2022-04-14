import { TestBed, inject } from '@angular/core/testing';

import { MaterialLotListService } from './material-lot-list.service';

describe('MaterialLotListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialLotListService]
    });
  });

  it('should be created', inject([MaterialLotListService], (service: MaterialLotListService) => {
    expect(service).toBeTruthy();
  }));
});
