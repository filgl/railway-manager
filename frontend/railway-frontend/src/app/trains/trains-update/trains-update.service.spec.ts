import { TestBed } from "@angular/core/testing";

import { TrainsUpdateService } from "./trains-update.service";

describe("TrainsUpdateService", () => {
  let service: TrainsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainsUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
