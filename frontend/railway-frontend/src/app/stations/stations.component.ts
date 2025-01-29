import { Component, OnInit } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";
import { Station } from "../Models/Station";
import { StationsService } from "./stations.service";

@Component({
  selector: "app-stations",
  imports: [NgForOf, NgIf],
  templateUrl: "./stations.component.html",
  styleUrl: "./stations.component.css",
})
export class StationsComponent implements OnInit {
  stations!: Station[];

  constructor(private stationsService: StationsService) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.stationsService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }
}
