import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainModelsComponent } from './train-models.component';

describe('TrainModelComponent', () => {
  let component: TrainModelsComponent;
  let fixture: ComponentFixture<TrainModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
