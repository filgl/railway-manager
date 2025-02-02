import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TrainModelsAddService } from "./train-models-add.service";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-train-models-add",
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: "./train-models-add.component.html",
  styleUrl: "./train-models-add.component.css",
})
export class TrainModelsAddComponent implements OnInit {
  trainModel: any = {};
  train_model!: any[];
  power_system!: any[];
  composition!: any[];
  @Input() errors: any = {};
  @Output() addTrainModelEvent: EventEmitter<any> = new EventEmitter();

  constructor(private trainModelsAddService: TrainModelsAddService) {}

  ngOnInit(): void {
    this.loadTrainModels();
    this.loadPowerSystems();
    this.loadCompositions();
  }

  loadTrainModels(): void {
    this.trainModelsAddService
      .getTrainModelChoices()
      .subscribe((response: { train_model_choices: any[] }): void => {
        this.train_model = response.train_model_choices;
      });
  }

  loadPowerSystems(): void {
    this.trainModelsAddService
      .getPowerSystemChoices()
      .subscribe((response: { power_system_choices: any[] }): void => {
        this.power_system = response.power_system_choices;
      });
  }

  loadCompositions(): void {
    this.trainModelsAddService
      .getCompositionChoices()
      .subscribe((response: { composition_choices: any[] }): void => {
        this.composition = response.composition_choices;
      });
  }

  onSubmit(): void {
    this.addTrainModelEvent.emit(this.trainModel);
  }

  resetForm(): void {
    this.trainModel = {};
  }
}
