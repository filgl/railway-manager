import { TestBed } from "@angular/core/testing";

import { RoutesDetailService } from "./routes-detail.service";

describe("RoutesDetailService", () => {
  let service: RoutesDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesDetailService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
