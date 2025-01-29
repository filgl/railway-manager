import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsDetailService } from "./train-models-detail.service";
import { NgForOf, NgIf } from "@angular/common";
import { Train } from "../../Models/Train";

@Component({
  selector: "app-train-models-detail",
  imports: [NgIf, RouterLink, NgForOf],
  templateUrl: "./train-models-detail.component.html",
  styleUrl: "./train-models-detail.component.css",
})
export class TrainModelsDetailComponent implements OnInit {
  trainModel!: TrainModel;
  trains!: Train[];

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
      this.trains = trainModel.trains;
    });
  }
}
