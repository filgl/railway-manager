import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Route } from "../../Models/Route";
import { RoutesDetailService } from "./routes-detail.service";
import { NgForOf, NgIf } from "@angular/common";
import { Train } from "../../Models/Train";

@Component({
  selector: "app-routes-detail",
  imports: [NgIf, RouterLink, NgForOf],
  templateUrl: "./routes-detail.component.html",
  styleUrl: "./routes-detail.component.css",
})
export class RoutesDetailComponent implements OnInit {
  route!: Route;
  trains!: Train[];

  constructor(
    private pageRoute: ActivatedRoute,
    private routesDetailService: RoutesDetailService,
  ) {}

  ngOnInit(): void {
    const id = this.pageRoute.snapshot.paramMap.get("id");
    this.loadRoute(id);
  }

  loadRoute(id: string | null): void {
    this.routesDetailService.getRoute(id).subscribe((route) => {
      this.route = route;
      this.trains = route.trains;
    });
  }
}
