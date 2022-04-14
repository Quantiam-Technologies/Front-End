import { TestBed, inject } from '@angular/core/testing';

import { MaterialSupplierService } from './material-supplier.service';

describe('MaterialSupplierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialSupplierService]
    });
  });

  it('should be created', inject([MaterialSupplierService], (service: MaterialSupplierService) => {
    expect(service).toBeTruthy();
  }));
});
