import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainModelsAddComponent } from "./train-models-add.component";

describe("TrainModelsAddComponent", () => {
  let component: TrainModelsAddComponent;
  let fixture: ComponentFixture<TrainModelsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainModelsAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainModelsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
