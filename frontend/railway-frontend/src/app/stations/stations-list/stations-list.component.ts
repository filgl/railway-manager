import { Component, OnInit, ViewChild } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsListService } from "./stations-list.service";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StationsAddComponent } from "../stations-add/stations-add.component";
import { RoutesAddComponent } from "../../routes/routes-add/routes-add.component";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-stations-list",
  imports: [NgForOf, RouterLink, StationsAddComponent, NgIf],
  templateUrl: "./stations-list.component.html",
  styleUrl: "./stations-list.component.css",
})
export class StationsListComponent implements OnInit {
  stations!: Station[];
  showForm: boolean = false;
  errors: any = {};
  @ViewChild(StationsAddComponent) stationsAddComponent!: StationsAddComponent;

  constructor(
    private stationsListService: StationsListService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadStations();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadStations(): void {
    this.stationsListService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }

  addStation(station: Station): void {
    this.stationsListService.addStation(station).subscribe({
      next: () => {
        this.loadStations();
        this.errors = {};
        this.stationsAddComponent.resetForm();
        this.showForm = false;
      },
      error: (error) => {
        if (error.status === 400) {
          this.errors = error.error;
        } else {
          console.error("Unexpected error:", error);
        }
      },
    });
  }

  deleteStation(station: Station) {
    this.stationsListService.deleteStation(station.id).subscribe({
      next: () => {
        this.loadStations();
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error.error);
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
