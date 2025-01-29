import { ComponentFixture, TestBed } from "@angular/core/testing";

import { StationsDetailComponent } from "./stations-detail.component";

describe("StationsDetailComponent", () => {
  let component: StationsDetailComponent;
  let fixture: ComponentFixture<StationsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationsDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StationsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
