import { TestBed } from '@angular/core/testing';

import { SelectMaterialContainerService } from './select-material-container.service';

describe('SelectMaterialContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectMaterialContainerService = TestBed.get(SelectMaterialContainerService);
    expect(service).toBeTruthy();
  });
});
