import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainsListComponent } from './trains-list.component';

describe('TrainsListComponent', () => {
  let component: TrainsListComponent;
  let fixture: ComponentFixture<TrainsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
