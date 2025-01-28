import {Component, OnInit} from '@angular/core';
import {TrainModel} from '../Models/TrainModel';
import {TrainModelsService} from '../train-models/train-models.service';
import {TrainsService} from './trains.service';
import {Train} from '../Models/Train';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trains',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './trains.component.html',
  styleUrl: './trains.component.css'
})
export class TrainsComponent implements OnInit {
  trains!: Train[];

  constructor(private trainsService: TrainsService) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  loadTrains(): void {
    this.trainsService.getTrains().subscribe(trains => {
      this.trains = trains;
    });
  }
}
