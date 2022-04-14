import { TestBed } from '@angular/core/testing';

import { ThreedmodelServiceService } from './threedmodel-service.service';

describe('ThreedmodelServiceService', () => {
  let service: ThreedmodelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreedmodelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
