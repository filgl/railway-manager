import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Route } from "../../Models/Route";
import { Train } from "../../Models/Train";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsListService } from "../../train-models/train-models-list/train-models-list.service";
import { RoutesListService } from "../../routes/routes-list/routes-list.service";
import { TrainsUpdateService } from "./trains-update.service";
import { TrainsDetailComponent } from "../trains-detail/trains-detail.component";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-trains-update",
  imports: [FormsModule, NgIf, NgForOf],
  templateUrl: "./trains-update.component.html",
  styleUrl: "./trains-update.component.css",
})
export class TrainsUpdateComponent implements OnInit {
  @Input() train!: Train;
  @Output() updatedTrain: EventEmitter<Train> = new EventEmitter<Train>();
  trainModels!: TrainModel[];
  associatedRoutes!: Route[];
  trainStates!: any[];
  errors: any = {};

  constructor(
    private trainModelsListService: TrainModelsListService,
    private routesListService: RoutesListService,
    private trainsUpdateService: TrainsUpdateService,
    private trainsDetailComponent: TrainsDetailComponent,
  ) {}

  ngOnInit(): void {
    this.loadTrainModels();
    this.loadAssociatedRoutes();
    this.loadTrainStates();
    this.train = structuredClone(this.train);
  }

  loadTrainModels(): void {
    this.trainModelsListService
      .getTrainModels()
      .subscribe((trainModels: TrainModel[]): void => {
        this.trainModels = trainModels;
      });
  }

  loadAssociatedRoutes(): void {
    this.routesListService.getRoutes().subscribe((routes: Route[]): void => {
      this.associatedRoutes = routes;
    });
  }

  loadTrainStates(): void {
    this.trainsUpdateService
      .getStateChoices()
      .subscribe((response: { state_choices: any[] }): void => {
        this.trainStates = response.state_choices;
      });
  }

  updateTrain(): void {
    const previousTrainState: string = this.train.actual_state;

    this.train.actual_state = this.train.actual_state
      .toLowerCase()
      .replaceAll(" ", "_");

    this.trainsUpdateService.updateTrain(this.train).subscribe({
      next: (updatedTrain: Train): void => {
        this.train = updatedTrain;
        this.errors = {};
        this.trainsDetailComponent.toggleForm();
        this.trainsDetailComponent.loadTrain(this.train.id);
      },
      error: (error: any): void => {
        if (error.status === 400) {
          this.errors = error.error;
          this.train.actual_state = previousTrainState;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
