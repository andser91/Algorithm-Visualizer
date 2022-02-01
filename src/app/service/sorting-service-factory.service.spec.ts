import { TestBed } from '@angular/core/testing';

import { SortingServiceFactoryService } from './sorting-service-factory.service';

describe('SortingServiceFactoryService', () => {
  let service: SortingServiceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingServiceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
