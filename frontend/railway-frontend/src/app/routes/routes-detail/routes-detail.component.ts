import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Route } from "../../Models/Route";
import { RoutesDetailService } from "./routes-detail.service";
import { NgForOf, NgIf } from "@angular/common";
import { Train } from "../../Models/Train";
import { StationsDetailService } from "../../stations/stations-detail/stations-detail.service";

@Component({
  selector: "app-routes-detail",
  imports: [NgIf, RouterLink, NgForOf],
  templateUrl: "./routes-detail.component.html",
  styleUrl: "./routes-detail.component.css",
})
export class RoutesDetailComponent implements OnInit {
  route!: Route;

  constructor(
    private pageRoute: ActivatedRoute,
    private routesDetailService: RoutesDetailService,
    private stationsDetailService: StationsDetailService,
  ) {}

  ngOnInit(): void {
    const id = this.pageRoute.snapshot.paramMap.get("id");
    this.loadRoute(id);
  }

  loadRoute(id: string | null): void {
    this.routesDetailService.getRoute(id).subscribe((route) => {
      this.route = route;

      this.stationsDetailService
        .getStation(String(route.start_station))
        .subscribe((startStation) => {
          route.start_station_name = startStation.name;
        });

      this.stationsDetailService
        .getStation(String(route.end_station))
        .subscribe((endStation) => {
          route.end_station_name = endStation.name;
        });
    });
  }
}
