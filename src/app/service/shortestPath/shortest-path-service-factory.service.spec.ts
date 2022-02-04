import { TestBed } from '@angular/core/testing';

import { ShortestPathServiceFactoryService } from './shortest-path-service-factory.service';

describe('ShortestPathServiceFactoryService', () => {
  let service: ShortestPathServiceFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortestPathServiceFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
