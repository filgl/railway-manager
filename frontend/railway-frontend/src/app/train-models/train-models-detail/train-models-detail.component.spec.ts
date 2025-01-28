import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainModelsDetailComponent } from './train-models-detail.component';

describe('TrainModelsDetailComponent', () => {
  let component: TrainModelsDetailComponent;
  let fixture: ComponentFixture<TrainModelsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainModelsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainModelsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
