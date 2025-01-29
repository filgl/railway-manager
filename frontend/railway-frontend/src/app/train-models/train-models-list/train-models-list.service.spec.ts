import { TestBed } from "@angular/core/testing";

import { TrainModelsListService } from "./train-models-list.service";

describe("TrainModelsListService", () => {
  let service: TrainModelsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainModelsListService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
