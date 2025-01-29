import { TestBed } from "@angular/core/testing";

import { StationsDetailService } from "./stations-detail.service";

describe("StationsDetailService", () => {
  let service: StationsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsDetailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
