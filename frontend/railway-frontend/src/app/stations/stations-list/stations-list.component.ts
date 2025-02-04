import { Component, OnInit, ViewChild } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsListService } from "./stations-list.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StationsAddComponent } from "../stations-add/stations-add.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-stations-list",
  imports: [NgForOf, RouterLink, StationsAddComponent, NgIf, NgClass],
  templateUrl: "./stations-list.component.html",
  styleUrl: "./stations-list.component.css",
})
export class StationsListComponent implements OnInit {
  stations!: Station[];
  showForm: boolean = false;
  errors: any = {};
  currentSorting: string = "lower_name";
  @ViewChild(StationsAddComponent) stationsAddComponent!: StationsAddComponent;

  constructor(
    private stationsListService: StationsListService,
    protected authService: AuthService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Stations list - Railway Manager");
    this.loadStations();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadStations(ordering: string = "lower_name"): void {
    this.stationsListService
      .getStations(ordering)
      .subscribe((stations: Station[]): void => {
        this.stations = stations;
        this.currentSorting = ordering;
      });
  }

  addStation(station: Station): void {
    this.stationsListService.addStation(station).subscribe({
      next: (): void => {
        this.loadStations();
        this.errors = {};
        this.stationsAddComponent.resetForm();
        this.showForm = false;
      },
      error: (error: any): void => {
        if (error.status === 400) {
          this.errors = error.error;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }

  deleteStation(station: Station): void {
    if (
      confirm(
        "Are you sure you want to delete this station? This action cannot be undone.",
      )
    ) {
      this.stationsListService.deleteStation(station.id).subscribe({
        next: (): void => {
          this.loadStations();
        },
        error: (err: any): void => {
          if (err.status === 400) {
            alert(err.error.error);
          } else {
            alert("An unexpected error occurred.");
          }
        },
      });
    }
  }
}
