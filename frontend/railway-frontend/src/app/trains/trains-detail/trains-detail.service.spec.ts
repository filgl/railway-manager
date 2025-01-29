import { TestBed } from "@angular/core/testing";

import { TrainsDetailService } from "./trains-detail.service";

describe("TrainsDetailService", () => {
  let service: TrainsDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainsDetailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
