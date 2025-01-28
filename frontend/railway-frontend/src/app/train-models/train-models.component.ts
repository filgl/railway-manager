import {Component, OnInit} from '@angular/core';
import {TrainModel} from '../Models/TrainModel';
import {TrainModelsService} from './train-models.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trains-model',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './train-models.component.html',
  styleUrl: './train-models.component.css'
})
export class TrainModelsComponent implements OnInit {
  trainModels!: TrainModel[];

  constructor(private trainModelsService: TrainModelsService) {}

  ngOnInit(): void {
    this.loadTrainModels();
  }

  loadTrainModels(): void {
    this.trainModelsService.getTrainModels().subscribe(trainModels => {
      this.trainModels = trainModels;
    });
  }
}
