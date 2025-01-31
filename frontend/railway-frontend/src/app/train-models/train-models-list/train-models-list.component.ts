import { Component, OnInit, ViewChild } from "@angular/core";
import { StationsListService } from "../../stations/stations-list/stations-list.service";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsListService } from "./train-models-list.service";
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { Station } from "../../Models/Station";
import { StationsAddComponent } from "../../stations/stations-add/stations-add.component";
import { TrainModelsAddComponent } from "../train-models-add/train-models-add.component";

@Component({
  selector: "app-train-models-list",
  imports: [NgForOf, RouterLink, NgIf, TrainModelsAddComponent],
  templateUrl: "./train-models-list.component.html",
  styleUrl: "./train-models-list.component.css",
})
export class TrainModelsListComponent implements OnInit {
  trainModels!: TrainModel[];
  showForm: boolean = false;
  errors: any = {};
  @ViewChild(TrainModelsAddComponent)
  trainModelsAddComponent!: TrainModelsAddComponent;

  constructor(private trainModelsListService: TrainModelsListService) {}

  ngOnInit(): void {
    this.loadTrainModels();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrainModels(): void {
    this.trainModelsListService.getTrainModels().subscribe((trainModels) => {
      this.trainModels = trainModels;
    });
  }

  addTrainModel(trainModel: TrainModel): void {
    this.trainModelsListService.addTrainModel(trainModel).subscribe({
      next: () => {
        this.loadTrainModels();
        this.errors = {};
        this.trainModelsAddComponent.resetForm();
        this.showForm = false;
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

  deleteTrainModel(trainModel: TrainModel) {
    this.trainModelsListService.deleteTrainModel(trainModel.id).subscribe({
      next: () => {
        this.loadTrainModels();
      },
      error: (err) => {
        if (err.status === 400) {
          alert(err.error.error);
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
