import { Component, OnInit } from "@angular/core";
import { Train } from "../../Models/Train";
import { TrainsListService } from "./trains-list.service";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TrainModelsDetailService } from "../../train-models/train-models-detail/train-models-detail.service";
import { RoutesDetailService } from "../../routes/routes-detail/routes-detail.service";
import { TrainsAddComponent } from "../trains-add/trains-add.component";
import { Route } from "../../Models/Route";

@Component({
  selector: "app-trains-list",
  imports: [NgForOf, RouterLink, NgIf, TrainsAddComponent],
  templateUrl: "./trains-list.component.html",
  styleUrl: "./trains-list.component.css",
})
export class TrainsListComponent implements OnInit {
  trains!: Train[];
  showForm: boolean = false;
  errors: any = {};

  constructor(
    private trainsListService: TrainsListService,
    private trainModelsDetailService: TrainModelsDetailService,
    private routesDetailService: RoutesDetailService,
  ) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrains(): void {
    this.trainsListService.getTrains().subscribe((trains) => {
      this.trains = trains;

      this.trains.forEach((train) => {
        this.trainModelsDetailService
          .getTrainModel(String(train.model))
          .subscribe((trainModel) => {
            train.model_name = trainModel.name;
          });
      });
    });
  }

  addTrain(train: Train): void {
    this.trainsListService.addTrain(train).subscribe({
      next: () => {
        this.loadTrains();
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
