import { TestBed } from '@angular/core/testing';

import { SemrunTypeService } from './semrun-type.service';

describe('SemrunTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemrunTypeService = TestBed.get(SemrunTypeService);
    expect(service).toBeTruthy();
  });
});
