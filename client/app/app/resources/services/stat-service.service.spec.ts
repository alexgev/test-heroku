import { TestBed, inject } from '@angular/core/testing';

import { StatServiceService } from './stat-service.service';

describe('StatServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatServiceService]
    });
  });

  it('should be created', inject([StatServiceService], (service: StatServiceService) => {
    expect(service).toBeTruthy();
  }));
});
