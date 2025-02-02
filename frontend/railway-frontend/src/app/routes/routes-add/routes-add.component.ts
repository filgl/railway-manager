import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RoutesAddService } from "./routes-add.service";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Station } from "../../Models/Station";
import { StationsListService } from "../../stations/stations-list/stations-list.service";

@Component({
  selector: "app-routes-add",
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: "./routes-add.component.html",
  styleUrl: "./routes-add.component.css",
})
export class RoutesAddComponent implements OnInit {
  route: any = {};
  stations!: Station[];
  route_type!: any[];
  actual_state!: any[];
  electrification!: any[];
  @Input() errors: any = {};
  @Output() addRouteEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private routesAddService: RoutesAddService,
    private stationsListService: StationsListService,
  ) {}

  ngOnInit(): void {
    this.loadStations();
    this.loadRouteTypes();
    this.loadActualStates();
    this.loadElectrification();
  }

  loadStations(): void {
    this.stationsListService
      .getStations()
      .subscribe((stations: Station[]): void => {
        this.stations = stations;
      });
  }

  loadRouteTypes(): void {
    this.routesAddService
      .getRouteTypeChoices()
      .subscribe((response: { route_type_choices: any[] }): void => {
        this.route_type = response.route_type_choices;
      });
  }

  loadActualStates() {
    this.routesAddService
      .getActualStateChoices()
      .subscribe((response: { state_choices: any[] }): void => {
        this.actual_state = response.state_choices;
      });
  }

  loadElectrification() {
    this.routesAddService
      .getElectrificationChoices()
      .subscribe((response: { electrification_choices: any[] }): void => {
        this.electrification = response.electrification_choices;
      });
  }

  onSubmit(): void {
    this.addRouteEvent.emit(this.route);
  }

  resetForm(): void {
    this.route = {};
  }
}
