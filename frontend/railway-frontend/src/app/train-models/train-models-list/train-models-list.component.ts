import {Component, OnInit} from '@angular/core';
import {StationsListService} from '../../stations/stations-list/stations-list.service';
import {TrainModel} from '../../Models/TrainModel';
import {TrainModelsListService} from './train-models-list.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-train-models-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './train-models-list.component.html',
  styleUrl: './train-models-list.component.css'
})
export class TrainModelsListComponent implements OnInit {
  trainModels!: TrainModel[];

  constructor(private trainModelsListService: TrainModelsListService) {}

  ngOnInit(): void {
    this.loadTrainModels();
  }

  loadTrainModels(): void {
    this.trainModelsListService.getTrainModels().subscribe(trainModels => {
      this.trainModels = trainModels;
    });
  }
}
