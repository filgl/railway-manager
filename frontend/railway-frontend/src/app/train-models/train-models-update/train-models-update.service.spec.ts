import { TestBed } from "@angular/core/testing";

import { TrainModelsUpdateService } from "./train-models-update.service";

describe("TrainModelsUpdateService", () => {
  let service: TrainModelsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelsUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
