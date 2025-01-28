import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsComponent } from './trains.component';

describe('TrainComponent', () => {
  let component: TrainsComponent;
  let fixture: ComponentFixture<TrainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
