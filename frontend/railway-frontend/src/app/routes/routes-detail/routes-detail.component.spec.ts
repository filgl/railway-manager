import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoutesDetailComponent } from "./routes-detail.component";

describe("RoutesDetailComponent", () => {
  let component: RoutesDetailComponent;
  let fixture: ComponentFixture<RoutesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
