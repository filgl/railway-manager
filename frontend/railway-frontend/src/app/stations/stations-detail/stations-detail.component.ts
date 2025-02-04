import { Component, OnInit } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsDetailService } from "./stations-detail.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { StationsUpdateComponent } from "../stations-update/stations-update.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-stations-detail",
  imports: [NgIf, RouterLink, NgForOf, StationsUpdateComponent, NgClass],
  templateUrl: "./stations-detail.component.html",
  styleUrl: "./stations-detail.component.css",
})
export class StationsDetailComponent implements OnInit {
  station!: Station;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private stationsDetailService: StationsDetailService,
    protected authService: AuthService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    const id: number = parseInt(<string>this.route.snapshot.paramMap.get("id"));
    this.loadStation(id);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadStation(id: number | null): void {
    this.stationsDetailService
      .getStation(id)
      .subscribe((station: Station): void => {
        this.station = station;
        this.titleService.setTitle(
          `'${this.station.name}' details - Railway Manager`,
        );
      });
  }
}
