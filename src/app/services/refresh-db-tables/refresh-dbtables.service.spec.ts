import { TestBed } from '@angular/core/testing';

import { RefreshDBTablesService } from './refresh-dbtables.service';

describe('RefreshDBTablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshDBTablesService = TestBed.get(RefreshDBTablesService);
    expect(service).toBeTruthy();
  });
});
