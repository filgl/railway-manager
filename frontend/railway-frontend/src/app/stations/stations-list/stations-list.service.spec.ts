import { TestBed } from '@angular/core/testing';

import { StationsListService } from './stations-list.service';

describe('StationsListService', () => {
  let service: StationsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
