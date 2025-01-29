import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainsAddComponent } from "./trains-add.component";

describe("TrainsAddComponent", () => {
  let component: TrainsAddComponent;
  let fixture: ComponentFixture<TrainsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
