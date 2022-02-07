import { TestBed } from '@angular/core/testing';

import { GraphAlgorithmFactoryService } from './graph-algorithm-factory.service';

describe('GraphAlgorithmFactoryService', () => {
  let service: GraphAlgorithmFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphAlgorithmFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
