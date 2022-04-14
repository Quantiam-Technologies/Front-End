import { TestBed, inject } from '@angular/core/testing';

import { MaterialDatatableService } from './material-datatable.service';

describe('MaterialDatatableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialDatatableService]
    });
  });

  it('should be created', inject([MaterialDatatableService], (service: MaterialDatatableService) => {
    expect(service).toBeTruthy();
  }));
});
