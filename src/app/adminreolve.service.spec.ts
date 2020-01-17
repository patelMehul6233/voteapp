import { TestBed } from '@angular/core/testing';

import { AdminreolveService } from './adminreolve.service';

describe('AdminreolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminreolveService = TestBed.get(AdminreolveService);
    expect(service).toBeTruthy();
  });
});
