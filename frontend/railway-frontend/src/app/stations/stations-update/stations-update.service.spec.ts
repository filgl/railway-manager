import { TestBed } from "@angular/core/testing";

import { StationsUpdateService } from "./stations-update.service";

describe("StationsUpdateService", () => {
  let service: StationsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
