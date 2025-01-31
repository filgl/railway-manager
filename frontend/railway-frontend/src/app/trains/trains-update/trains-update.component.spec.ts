import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainsUpdateComponent } from "./trains-update.component";

describe("TrainsUpdateComponent", () => {
  let component: TrainsUpdateComponent;
  let fixture: ComponentFixture<TrainsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
