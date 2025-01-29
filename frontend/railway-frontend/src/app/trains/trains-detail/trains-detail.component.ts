import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Train} from '../../Models/Train';
import {TrainsDetailService} from './trains-detail.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-trains-detail',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './trains-detail.component.html',
  styleUrl: './trains-detail.component.css'
})
export class TrainsDetailComponent implements OnInit {
  train!: Train;

  constructor(private route: ActivatedRoute, private trainsDetailService: TrainsDetailService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadTrain(id);
  }

  loadTrain(id: string | null): void {
    this.trainsDetailService.getTrain(id).subscribe(train => {
      this.train = train;
    });
  }
}
