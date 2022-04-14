import { TestBed, inject } from '@angular/core/testing';

import { MaterialLotContainerDatatableService } from './material-lot-container-datatable.service';

describe('MaterialLotContainerDatatableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialLotContainerDatatableService]
    });
  });

  it('should be created', inject([MaterialLotContainerDatatableService], (service: MaterialLotContainerDatatableService) => {
    expect(service).toBeTruthy();
  }));
});
