import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Station } from "../../Models/Station";
import { Route } from "../../Models/Route";
import { RoutesUpdateService } from "./routes-update.service";
import { RoutesDetailComponent } from "../routes-detail/routes-detail.component";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { StationsListService } from "../../stations/stations-list/stations-list.service";

@Component({
  selector: "app-routes-update",
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: "./routes-update.component.html",
  styleUrl: "./routes-update.component.css",
})
export class RoutesUpdateComponent implements OnInit {
  @Input() route!: Route;
  @Output() updatedRoute = new EventEmitter<Route>();
  stations!: Station[];
  route_types!: any[];
  route_states!: any[];
  electrification_types!: any[];
  errors: any = {};

  constructor(
    private routesUpdateService: RoutesUpdateService,
    private routesDetailComponent: RoutesDetailComponent,
    private stationsListService: StationsListService,
  ) {}

  ngOnInit() {
    this.loadStations();
    this.loadRouteTypes();
    this.loadRouteStates();
    this.loadElectrificationTypes();
    this.route = structuredClone(this.route);
  }

  loadStations() {
    this.stationsListService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }

  loadRouteTypes() {
    this.routesUpdateService.getTypeChoices().subscribe((response) => {
      this.route_types = response.route_type_choices;
    });
  }

  loadRouteStates() {
    this.routesUpdateService.getStateChoices().subscribe((response) => {
      this.route_states = response.state_choices;
    });
  }

  loadElectrificationTypes() {
    this.routesUpdateService
      .getElectrificationChoices()
      .subscribe((response) => {
        this.electrification_types = response.electrification_choices;
      });
  }

  updateRoute(): void {
    const previousRouteType = this.route.type;
    const previousRouteState = this.route.actual_state;
    const previousRouteElectrification = this.route.electrified;

    this.route.type = this.route.type.toLowerCase().replaceAll(" ", "_");

    this.route.actual_state = this.route.actual_state
      .toLowerCase()
      .replaceAll(" ", "_");

    this.route.electrified = this.route.electrified
      .toLowerCase()
      .replaceAll(" ", "_");

    this.routesUpdateService.updateRoute(this.route).subscribe({
      next: (updatedRoute: Route) => {
        this.route = updatedRoute;
        this.errors = {};
        this.routesDetailComponent.toggleForm();
        this.routesDetailComponent.loadRoute(this.route.id);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errors = error.error;
          this.route.type = previousRouteType;
          this.route.actual_state = previousRouteState;
          this.route.electrified = previousRouteElectrification;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
