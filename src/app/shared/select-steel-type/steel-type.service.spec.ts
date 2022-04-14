import { TestBed } from '@angular/core/testing';

import { SteelTypeService } from './steel-type.service';

describe('SteelTypeService', () => {
  let service: SteelTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteelTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
