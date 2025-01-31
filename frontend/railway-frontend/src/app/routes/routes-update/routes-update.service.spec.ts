import { TestBed } from "@angular/core/testing";

import { RoutesUpdateService } from "./routes-update.service";

describe("RoutesUpdateService", () => {
  let service: RoutesUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesUpdateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
