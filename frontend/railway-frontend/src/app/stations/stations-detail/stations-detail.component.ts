import { Component, OnInit } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsDetailService } from "./stations-detail.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { StationsUpdateComponent } from "../stations-update/stations-update.component";

@Component({
  selector: "app-stations-detail",
  imports: [NgIf, RouterLink, NgForOf, StationsUpdateComponent],
  templateUrl: "./stations-detail.component.html",
  styleUrl: "./stations-detail.component.css",
})
export class StationsDetailComponent implements OnInit {
  station!: Station;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private stationsDetailService: StationsDetailService,
  ) {}

  ngOnInit(): void {
    const id = parseInt(<string>this.route.snapshot.paramMap.get("id"));
    this.loadStation(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadStation(id: number | null): void {
    this.stationsDetailService.getStation(id).subscribe((station) => {
      this.station = station;
    });
  }
}
