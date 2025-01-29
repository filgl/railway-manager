import { Component, OnInit } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsDetailService } from "./stations-detail.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { Route } from "../../Models/Route";

@Component({
  selector: "app-stations-detail",
  imports: [NgIf, RouterLink, NgForOf],
  templateUrl: "./stations-detail.component.html",
  styleUrl: "./stations-detail.component.css",
})
export class StationsDetailComponent implements OnInit {
  station!: Station;
  startRoutes!: Route[];
  endRoutes!: Route[];

  constructor(
    private route: ActivatedRoute,
    private stationsDetailService: StationsDetailService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.loadStation(id);
  }

  loadStation(id: string | null): void {
    this.stationsDetailService.getStation(id).subscribe((station) => {
      this.station = station;
      this.startRoutes = station.start_routes;
      this.endRoutes = station.end_routes;
    });
  }
}
