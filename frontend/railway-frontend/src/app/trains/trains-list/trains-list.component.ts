import {Component, OnInit} from '@angular/core';
import {TrainModel} from '../../Models/TrainModel';
import {TrainModelsListService} from '../../train-models/train-models-list/train-models-list.service';
import {Train} from '../../Models/Train';
import {TrainsListService} from './trains-list.service';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-trains-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './trains-list.component.html',
  styleUrl: './trains-list.component.css'
})
export class TrainsListComponent implements OnInit {
  trains!: Train[];

  constructor(private trainsListService: TrainsListService) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  loadTrains(): void {
    this.trainsListService.getTrains().subscribe(trains => {
      this.trains = trains;
    });
  }
}
