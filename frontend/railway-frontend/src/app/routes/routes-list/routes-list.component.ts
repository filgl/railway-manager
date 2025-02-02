import { Component, OnInit, ViewChild } from "@angular/core";
import { RoutesListService } from "./routes-list.service";
import { Route } from "../../Models/Route";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RoutesAddComponent } from "../routes-add/routes-add.component";
import { AuthService } from "../../auth.service";

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
  @ViewChild(RoutesAddComponent) routesAddComponent!: RoutesAddComponent;

  constructor(
    private routesListService: RoutesListService,
    protected authService: AuthService,
  ) {}

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
      next: (): void => {
        this.loadRoutes();
        this.errors = {};
        this.routesAddComponent.resetForm();
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

  deleteRoute(route: Route): void {
    if (
      confirm(
        "Are you sure you want to delete this route? This action cannot be undone.",
      )
    ) {
      this.routesListService.deleteRoute(route.id).subscribe({
        next: (): void => {
          this.loadRoutes();
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
