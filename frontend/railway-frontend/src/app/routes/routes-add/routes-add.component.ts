import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RoutesAddService } from "./routes-add.service";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { Route } from "../../Models/Route";
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

  ngOnInit() {
    this.loadStations();
    this.loadRouteTypes();
    this.loadActualStates();
    this.loadElectrification();
  }

  loadStations() {
    this.stationsListService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }

  loadRouteTypes() {
    this.routesAddService.getRouteTypeChoices().subscribe((response) => {
      this.route_type = response.route_type_choices;
    });
  }

  loadActualStates() {
    this.routesAddService.getActualStateChoices().subscribe((response) => {
      this.actual_state = response.state_choices;
    });
  }

  loadElectrification() {
    this.routesAddService.getElectrificationChoices().subscribe((response) => {
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
