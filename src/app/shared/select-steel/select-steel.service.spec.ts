import { TestBed } from '@angular/core/testing';

import { SelectSteelService } from './select-steel.service';

describe('SelectSteelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectSteelService = TestBed.get(SelectSteelService);
    expect(service).toBeTruthy();
  });
});
