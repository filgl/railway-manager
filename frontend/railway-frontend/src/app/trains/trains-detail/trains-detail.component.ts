import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, RouterLink } from "@angular/router";
import { Train } from "../../Models/Train";
import { TrainsDetailService } from "./trains-detail.service";
import { NgIf } from "@angular/common";
import { RoutesDetailService } from "../../routes/routes-detail/routes-detail.service";
import { TrainsUpdateComponent } from "../trains-update/trains-update.component";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-trains-detail",
  imports: [NgIf, RouterLink, TrainsUpdateComponent],
  templateUrl: "./trains-detail.component.html",
  styleUrl: "./trains-detail.component.css",
})
export class TrainsDetailComponent implements OnInit {
  train!: Train;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private trainsDetailService: TrainsDetailService,
    private routesDetailService: RoutesDetailService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get("id"));
    this.loadTrain(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrain(id: number | null): void {
    this.trainsDetailService.getTrain(id).subscribe((train: Train): void => {
      this.train = train;

      this.routesDetailService
        .getRoute(train.associated_route)
        .subscribe((associatedRoute): void => {
          train.associated_route = associatedRoute.id;
        });
    });
  }
}
