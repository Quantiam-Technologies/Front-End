import { TestBed } from '@angular/core/testing';

import { SelectMaterialSupplierService } from './select-material-supplier.service';

describe('SelectMaterialSupplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectMaterialSupplierService = TestBed.get(SelectMaterialSupplierService);
    expect(service).toBeTruthy();
  });
});
