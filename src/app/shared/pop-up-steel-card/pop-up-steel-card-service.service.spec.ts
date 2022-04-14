import { TestBed } from '@angular/core/testing';

import { PopUpSteelCardServiceService } from './pop-up-steel-card-service.service';

describe('PopUpSteelCardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopUpSteelCardServiceService = TestBed.get(PopUpSteelCardServiceService);
    expect(service).toBeTruthy();
  });
});
