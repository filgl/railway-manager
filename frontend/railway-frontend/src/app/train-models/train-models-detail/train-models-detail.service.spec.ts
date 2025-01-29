import { TestBed } from "@angular/core/testing";

import { TrainModelsDetailService } from "./train-models-detail.service";

describe("TrainModelsDetailService", () => {
  let service: TrainModelsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelsDetailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
