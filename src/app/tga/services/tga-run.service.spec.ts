import { TestBed } from '@angular/core/testing';

import { TgaRunService } from './tga-run.service';

describe('TgaRunService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TgaRunService = TestBed.get(TgaRunService);
    expect(service).toBeTruthy();
  });
});
