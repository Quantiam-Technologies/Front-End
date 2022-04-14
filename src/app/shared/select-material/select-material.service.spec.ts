import { TestBed } from '@angular/core/testing';

import { SelectMaterialService } from './select-material.service';

describe('SelectMaterialService', () => {
  let service: SelectMaterialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectMaterialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
