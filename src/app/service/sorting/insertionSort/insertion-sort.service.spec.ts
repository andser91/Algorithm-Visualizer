import { TestBed } from '@angular/core/testing';

import { InsertionSortService } from './insertion-sort.service';

describe('InsertionSortService', () => {
  let service: InsertionSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsertionSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
