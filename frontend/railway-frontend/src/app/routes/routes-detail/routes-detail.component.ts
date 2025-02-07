import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Route } from "../../Models/Route";
import { RoutesDetailService } from "./routes-detail.service";
import { DecimalPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { RoutesUpdateComponent } from "../routes-update/routes-update.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-routes-detail",
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    RoutesUpdateComponent,
    NgClass,
    DecimalPipe,
  ],
  templateUrl: "./routes-detail.component.html",
  styleUrl: "./routes-detail.component.css",
})
export class RoutesDetailComponent implements OnInit {
  route!: Route;
  showForm: boolean = false;

  constructor(
    private pageRoute: ActivatedRoute,
    private routesDetailService: RoutesDetailService,
    protected authService: AuthService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    const id: number = parseInt(
      <string>this.pageRoute.snapshot.paramMap.get("id"),
    );
    this.loadRoute(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadRoute(id: number | null): void {
    this.routesDetailService.getRoute(id).subscribe((route: Route): void => {
      this.route = route;
      this.titleService.setTitle(
        `'${this.route.start_station_name} - ${this.route.end_station_name}' details - Railway Manager`,
      );
    });
  }
}
