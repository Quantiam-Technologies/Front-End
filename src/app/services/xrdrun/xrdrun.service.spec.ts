import { TestBed, inject } from '@angular/core/testing';

import { XrdrunService } from './xrdrun.service';

describe('XrdrunService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XrdrunService]
    });
  });

  it('should be created', inject([XrdrunService], (service: XrdrunService) => {
    expect(service).toBeTruthy();
  }));
});
