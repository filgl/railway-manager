import { TestBed } from "@angular/core/testing";

import { RoutesAddService } from "./routes-add.service";

describe("RoutesAddService", () => {
  let service: RoutesAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesAddService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
