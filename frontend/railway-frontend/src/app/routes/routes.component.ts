import { Component, OnInit } from "@angular/core";
import { NgForOf, NgIf } from "@angular/common";
import { Route } from "../Models/Route";
import { RoutesService } from "./routes.service";

@Component({
  selector: "app-routes",
  imports: [NgForOf, NgIf],
  templateUrl: "./routes.component.html",
  styleUrl: "./routes.component.css",
})
export class RoutesComponent implements OnInit {
  routes!: Route[];

  constructor(private routesService: RoutesService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routesService.getRoutes().subscribe((routes: Route[]) => {
      this.routes = routes;
    });
  }
}
