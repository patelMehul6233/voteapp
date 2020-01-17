import { TestBed } from '@angular/core/testing';

import { InItService } from './in-it.service';

describe('InItService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InItService = TestBed.get(InItService);
    expect(service).toBeTruthy();
  });
});
