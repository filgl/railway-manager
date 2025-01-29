import { TestBed } from "@angular/core/testing";

import { TrainModelsAddService } from "./train-models-add.service";

describe("TrainModelsAddService", () => {
  let service: TrainModelsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelsAddService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
