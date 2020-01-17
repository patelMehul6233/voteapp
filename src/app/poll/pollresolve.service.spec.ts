import { TestBed } from '@angular/core/testing';

import { PollresolveService } from './pollresolve.service';

describe('PollresolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollresolveService = TestBed.get(PollresolveService);
    expect(service).toBeTruthy();
  });
});
