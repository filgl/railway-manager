import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TrainModel } from "../../Models/TrainModel";
import { TrainModelsDetailService } from "./train-models-detail.service";
import { DecimalPipe, NgClass, NgForOf, NgIf } from "@angular/common";
import { Train } from "../../Models/Train";
import { TrainModelsUpdateComponent } from "../train-models-update/train-models-update.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-train-models-detail",
  imports: [
    NgIf,
    RouterLink,
    NgForOf,
    TrainModelsUpdateComponent,
    NgClass,
    DecimalPipe,
  ],
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
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get("id"));
    this.loadTrainModel(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrainModel(id: number | null): void {
    this.trainModelsDetailService
      .getTrainModel(id)
      .subscribe((trainModel: TrainModel): void => {
        this.trainModel = trainModel;
        this.trains = trainModel.trains;
        this.titleService.setTitle(
          `'${this.trainModel.name}' details - Railway Manager`,
        );
      });
  }
}
