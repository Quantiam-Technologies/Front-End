import { TestBed } from '@angular/core/testing';

import { ContainerAggridService } from './container-aggrid.service';

describe('ContainerAggridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerAggridService = TestBed.get(ContainerAggridService);
    expect(service).toBeTruthy();
  });
});
