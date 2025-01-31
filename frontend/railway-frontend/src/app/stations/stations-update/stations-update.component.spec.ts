import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StationsUpdateComponent } from "./stations-update.component";

describe("StationsUpdateComponent", () => {
  let component: StationsUpdateComponent;
  let fixture: ComponentFixture<StationsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
