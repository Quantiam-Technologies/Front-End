import { TestBed, inject } from '@angular/core/testing';

import { SampleCommentService } from './sample-comment.service';

describe('SampleCommentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleCommentService]
    });
  });

  it('should be created', inject([SampleCommentService], (service: SampleCommentService) => {
    expect(service).toBeTruthy();
  }));
});
