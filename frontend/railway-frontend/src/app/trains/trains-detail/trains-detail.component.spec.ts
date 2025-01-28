import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsDetailComponent } from './trains-detail.component';

describe('TrainsDetailComponent', () => {
  let component: TrainsDetailComponent;
  let fixture: ComponentFixture<TrainsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
