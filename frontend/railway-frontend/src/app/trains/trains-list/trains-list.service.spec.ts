import { TestBed } from '@angular/core/testing';

import { TrainsListService } from './trains-list.service';

describe('TrainsListService', () => {
  let service: TrainsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
