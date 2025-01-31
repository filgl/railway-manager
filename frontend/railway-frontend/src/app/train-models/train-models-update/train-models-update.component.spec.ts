import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainModelsUpdateComponent } from "./train-models-update.component";

describe("TrainModelsUpdateComponent", () => {
  let component: TrainModelsUpdateComponent;
  let fixture: ComponentFixture<TrainModelsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainModelsUpdateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainModelsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
