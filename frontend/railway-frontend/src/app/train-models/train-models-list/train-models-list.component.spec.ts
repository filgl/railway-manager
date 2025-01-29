import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrainModelsListComponent } from "./train-models-list.component";

describe("TrainModelsListComponent", () => {
  let component: TrainModelsListComponent;
  let fixture: ComponentFixture<TrainModelsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainModelsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainModelsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
