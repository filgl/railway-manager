import { Component, OnInit, ViewChild } from "@angular/core";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsListService } from "./train-models-list.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TrainModelsAddComponent } from "../train-models-add/train-models-add.component";
import { AuthService } from "../../auth.service";
import { Train } from "../../Models/Train";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-train-models-list",
  imports: [NgForOf, RouterLink, NgIf, TrainModelsAddComponent, NgClass],
  templateUrl: "./train-models-list.component.html",
  styleUrl: "./train-models-list.component.css",
})
export class TrainModelsListComponent implements OnInit {
  trainModels!: TrainModel[];
  showForm: boolean = false;
  errors: any = {};
  @ViewChild(TrainModelsAddComponent)
  trainModelsAddComponent!: TrainModelsAddComponent;
  currentSorting: string = "lower_name";

  constructor(
    private trainModelsListService: TrainModelsListService,
    protected authService: AuthService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Train models list - Railway Manager");
    this.loadTrainModels();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrainModels(ordering: string = "lower_name"): void {
    this.trainModelsListService
      .getTrainModels(ordering)
      .subscribe((trainModels: TrainModel[]): void => {
        this.trainModels = trainModels;
        this.currentSorting = ordering;
      });
  }

  addTrainModel(trainModel: TrainModel): void {
    this.trainModelsListService.addTrainModel(trainModel).subscribe({
      next: (): void => {
        this.loadTrainModels();
        this.errors = {};
        this.trainModelsAddComponent.resetForm();
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

  deleteTrainModel(trainModel: TrainModel): void {
    if (
      confirm(
        "Are you sure you want to delete this train model? This action cannot be undone.",
      )
    ) {
      this.trainModelsListService.deleteTrainModel(trainModel.id).subscribe({
        next: (): void => {
          this.loadTrainModels();
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
