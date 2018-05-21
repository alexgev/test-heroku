import { TestBed, inject } from '@angular/core/testing';

import { BroadcastUrlService } from './broadcast-url.service';

describe('BroadcastUrlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BroadcastUrlService]
    });
  });

  it('should be created', inject([BroadcastUrlService], (service: BroadcastUrlService) => {
    expect(service).toBeTruthy();
  }));
});
