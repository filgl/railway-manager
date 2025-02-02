import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TrainModel } from "../../Models/TrainModel";
import { TrainsAddService } from "./trains-add.service";
import { TrainModelsListService } from "../../train-models/train-models-list/train-models-list.service";
import { RoutesListService } from "../../routes/routes-list/routes-list.service";
import { Route } from "../../Models/Route";
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StationsDetailService } from "../../stations/stations-detail/stations-detail.service";

@Component({
  selector: "app-trains-add",
  imports: [NgIf, NgForOf, FormsModule],
  templateUrl: "./trains-add.component.html",
  styleUrl: "./trains-add.component.css",
})
export class TrainsAddComponent implements OnInit {
  train: any = {};
  trainModels!: TrainModel[];
  routes!: Route[];
  actual_state!: any[];
  @Input() errors: any = {};
  @Output() addTrainEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private trainsAddService: TrainsAddService,
    private trainModelsListService: TrainModelsListService,
    private routesListService: RoutesListService,
  ) {}

  ngOnInit(): void {
    this.loadTrainModels();
    this.loadRoutes();
    this.loadActualStates();
  }

  loadTrainModels(): void {
    this.trainModelsListService
      .getTrainModels()
      .subscribe((trainModels: TrainModel[]): void => {
        this.trainModels = trainModels;
      });
  }

  loadRoutes(): void {
    this.routesListService.getRoutes().subscribe((routes: Route[]): void => {
      this.routes = routes;
    });
  }

  loadActualStates(): void {
    this.trainsAddService
      .getActualStateChoices()
      .subscribe((response: { state_choices: any[] }): void => {
        this.actual_state = response.state_choices;
      });
  }

  onSubmit(): void {
    this.addTrainEvent.emit(this.train);
  }

  resetForm(): void {
    this.train = {};
  }
}
