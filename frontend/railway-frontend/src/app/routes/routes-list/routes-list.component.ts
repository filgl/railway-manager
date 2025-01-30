import { Component, OnInit } from "@angular/core";
import { RoutesListService } from "./routes-list.service";
import { Route } from "../../Models/Route";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Station } from "../../Models/Station";
import { StationsAddComponent } from "../../stations/stations-add/stations-add.component";
import { RoutesAddComponent } from "../routes-add/routes-add.component";
import { StationsDetailService } from "../../stations/stations-detail/stations-detail.service";

@Component({
  selector: "app-routes-list",
  imports: [NgForOf, RouterLink, NgIf, RoutesAddComponent],
  templateUrl: "./routes-list.component.html",
  styleUrl: "./routes-list.component.css",
})
export class RoutesListComponent implements OnInit {
  routes!: Route[];
  showForm: boolean = false;
  errors: any = {};

  constructor(private routesListService: RoutesListService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadRoutes(): void {
    this.routesListService.getRoutes().subscribe((routes) => {
      this.routes = routes;
    });
  }

  addRoute(route: Route): void {
    this.routesListService.addRoute(route).subscribe({
      next: () => {
        this.loadRoutes();
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
