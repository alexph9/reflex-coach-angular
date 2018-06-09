import { TestBed, inject } from '@angular/core/testing';

import { TryService } from './try.service';

describe('TryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TryService]
    });
  });

  it('should be created', inject([TryService], (service: TryService) => {
    expect(service).toBeTruthy();
  }));
});
