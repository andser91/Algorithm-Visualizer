import { TestBed } from '@angular/core/testing';

import { SelectionSortService } from './selection-sort.service';

describe('SelectionSortService', () => {
  let service: SelectionSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
