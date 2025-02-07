import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Train } from "../../Models/Train";
import { TrainsDetailService } from "./trains-detail.service";
import { DecimalPipe, NgClass, NgIf } from "@angular/common";
import { RoutesDetailService } from "../../routes/routes-detail/routes-detail.service";
import { TrainsUpdateComponent } from "../trains-update/trains-update.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-trains-detail",
  imports: [NgIf, RouterLink, TrainsUpdateComponent, NgClass, DecimalPipe],
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
    private titleService: Title,
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

      this.titleService.setTitle(
        `'${this.train.model_name} ${this.train.number}' details - Railway Manager`,
      );
    });
  }
}
