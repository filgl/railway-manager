import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsUpdateService } from "../../stations/stations-update/stations-update.service";
import { StationsDetailComponent } from "../../stations/stations-detail/stations-detail.component";
import { Route } from "../../Models/Route";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsUpdateService } from "./train-models-update.service";
import { TrainModelsDetailComponent } from "../train-models-detail/train-models-detail.component";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-train-models-update",
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: "./train-models-update.component.html",
  styleUrl: "./train-models-update.component.css",
})
export class TrainModelsUpdateComponent implements OnInit {
  @Input() trainModel!: TrainModel;
  @Output() updatedTrainModel = new EventEmitter<TrainModel>();
  train_type!: any[];
  power_system!: any[];
  composition!: any[];
  errors: any = {};

  constructor(
    private trainModelsUpdateService: TrainModelsUpdateService,
    private trainModelsDetailComponent: TrainModelsDetailComponent,
  ) {}

  ngOnInit() {
    this.loadTrainTypes();
    this.loadPowerSystems();
    this.loadCompositions();
    this.trainModel = structuredClone(this.trainModel);
  }

  loadTrainTypes() {
    this.trainModelsUpdateService.getTypeChoices().subscribe((response) => {
      this.train_type = response.train_model_choices;
    });
  }

  loadPowerSystems() {
    this.trainModelsUpdateService
      .getPowerSystemChoices()
      .subscribe((response) => {
        this.power_system = response.power_system_choices;
      });
  }

  loadCompositions() {
    this.trainModelsUpdateService
      .getCompositionChoices()
      .subscribe((response) => {
        this.composition = response.composition_choices;
      });
  }

  updateTrainModel(): void {
    const previousType = this.trainModel.type;
    const previousPowerSystem = this.trainModel.power_system;
    const previousComposition = this.trainModel.composition;

    this.trainModel.type = this.trainModel.type
      .toLowerCase()
      .replaceAll(" ", "_");

    this.trainModel.power_system = this.trainModel.power_system
      .toLowerCase()
      .replaceAll(" ", "_");

    this.trainModel.composition = this.trainModel.composition
      .toLowerCase()
      .replaceAll(" ", "_");

    this.trainModelsUpdateService.updateTrainModel(this.trainModel).subscribe({
      next: (updatedTrainModel: TrainModel) => {
        this.trainModel = updatedTrainModel;
        this.errors = {};
        this.trainModelsDetailComponent.toggleForm();
        this.trainModelsDetailComponent.loadTrainModel(this.trainModel.id);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errors = error.error;
          this.trainModel.type = previousType;
          this.trainModel.power_system = previousPowerSystem;
          this.trainModel.composition = previousComposition;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
