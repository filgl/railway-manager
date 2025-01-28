import {Component, OnInit} from '@angular/core';
import {Station} from '../../Models/Station';
import {StationsListService} from '../stations-list/stations-list.service';
import {StationsDetailService} from './stations-detail.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-stations-detail',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './stations-detail.component.html',
  styleUrl: './stations-detail.component.css'
})
export class StationsDetailComponent implements OnInit {
  station!: Station;

  constructor(private route: ActivatedRoute, private stationsDetailService: StationsDetailService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadStation(id);
  }

  loadStation(id: string | null): void {
    this.stationsDetailService.getStation(id).subscribe(station => {
      this.station = station;
    });
  }
}
