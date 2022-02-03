import { TestBed } from '@angular/core/testing';

import { ShakerSortService } from './shaker-sort.service';

describe('ShakerSortService', () => {
  let service: ShakerSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShakerSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
