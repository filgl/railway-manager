import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsDetailService } from "./train-models-detail.service";
import { NgForOf, NgIf } from "@angular/common";
import { Train } from "../../Models/Train";
import { RoutesUpdateComponent } from "../../routes/routes-update/routes-update.component";
import { TrainModelsUpdateComponent } from "../train-models-update/train-models-update.component";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-train-models-detail",
  imports: [NgIf, RouterLink, NgForOf, TrainModelsUpdateComponent],
  templateUrl: "./train-models-detail.component.html",
  styleUrl: "./train-models-detail.component.css",
})
export class TrainModelsDetailComponent implements OnInit {
  trainModel!: TrainModel;
  trains!: Train[];
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private trainModelsDetailService: TrainModelsDetailService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    const id = parseInt(<string>this.route.snapshot.paramMap.get("id"));
    this.loadTrainModel(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrainModel(id: number | null): void {
    this.trainModelsDetailService.getTrainModel(id).subscribe((trainModel) => {
      this.trainModel = trainModel;
      this.trains = trainModel.trains;
    });
  }
}
