import { TestBed } from '@angular/core/testing';

import { TrainModelsService } from './train-models.service';

describe('TrainModelService', () => {
  let service: TrainModelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
