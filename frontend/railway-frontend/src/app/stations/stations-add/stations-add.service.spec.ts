import { TestBed } from "@angular/core/testing";

import { StationsAddService } from "./stations-add.service";

describe("StationsAddService", () => {
  let service: StationsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationsAddService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
