import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsDetailService } from "./train-models-detail.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-train-models-detail",
  imports: [NgIf, RouterLink],
  templateUrl: "./train-models-detail.component.html",
  styleUrl: "./train-models-detail.component.css",
})
export class TrainModelsDetailComponent implements OnInit {
  trainModel!: TrainModel;

  constructor(
    private route: ActivatedRoute,
    private trainModelsDetailService: TrainModelsDetailService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.loadTrainModel(id);
  }

  loadTrainModel(id: string | null): void {
    this.trainModelsDetailService.getTrainModel(id).subscribe((trainModel) => {
      this.trainModel = trainModel;
    });
  }
}
