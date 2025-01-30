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

  ngOnInit() {
    this.loadTrainModels();
    this.loadPowerSystems();
    this.loadCompositions();
  }

  loadTrainModels() {
    this.trainModelsAddService.getTrainModelChoices().subscribe((response) => {
      this.train_model = response.train_model_choices;
    });
  }

  loadPowerSystems() {
    this.trainModelsAddService.getPowerSystemChoices().subscribe((response) => {
      this.power_system = response.power_system_choices;
    });
  }

  loadCompositions() {
    this.trainModelsAddService.getCompositionChoices().subscribe((response) => {
      this.composition = response.composition_choices;
    });
  }

  onSubmit(): void {
    const trainModel = this.trainModel;
    this.addTrainModelEvent.emit(trainModel);
  }
}
