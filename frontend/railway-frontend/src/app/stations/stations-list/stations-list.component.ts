import { Component, OnInit } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsListService } from "./stations-list.service";
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-stations-list",
  imports: [NgForOf, RouterLink],
  templateUrl: "./stations-list.component.html",
  styleUrl: "./stations-list.component.css",
})
export class StationsListComponent implements OnInit {
  stations!: Station[];

  constructor(private stationsListService: StationsListService) {}

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.stationsListService.getStations().subscribe((stations) => {
      this.stations = stations;
    });
  }
}
