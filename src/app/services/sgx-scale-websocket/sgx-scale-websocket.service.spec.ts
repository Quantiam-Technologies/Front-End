import { TestBed, inject } from '@angular/core/testing';

import { SgxScaleWebsocketService } from './sgx-scale-websocket.service';

describe('SgxScaleWebsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SgxScaleWebsocketService]
    });
  });

  it('should be created', inject([SgxScaleWebsocketService], (service: SgxScaleWebsocketService) => {
    expect(service).toBeTruthy();
  }));
});
