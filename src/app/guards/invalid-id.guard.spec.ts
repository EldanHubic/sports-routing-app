import { TestBed } from '@angular/core/testing';

import { InvalidIdGuard } from './invalid-id.guard';

describe('InvalidIdGuard', () => {
  let guard: InvalidIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvalidIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
