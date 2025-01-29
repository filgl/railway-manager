import { TestBed } from "@angular/core/testing";

import { TrainsAddService } from "./trains-add.service";

describe("TrainsAddService", () => {
  let service: TrainsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainsAddService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
