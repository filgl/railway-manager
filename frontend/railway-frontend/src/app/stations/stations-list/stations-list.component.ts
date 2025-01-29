import { Component, OnInit } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsListService } from "./stations-list.service";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StationsAddComponent } from "../stations-add/stations-add.component";

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

  constructor(private stationsListService: StationsListService) {}

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
}
