import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RoutesAddComponent } from "./routes-add.component";

describe("RoutesAddComponent", () => {
  let component: RoutesAddComponent;
  let fixture: ComponentFixture<RoutesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutesAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
