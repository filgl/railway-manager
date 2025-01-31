import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Station } from "../../Models/Station";
import { StationsUpdateService } from "./stations-update.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { StationsAddService } from "../stations-add/stations-add.service";
import { StationsDetailComponent } from "../stations-detail/stations-detail.component";

@Component({
  selector: "app-stations-update",
  imports: [FormsModule, NgForOf, NgIf, ReactiveFormsModule],
  templateUrl: "./stations-update.component.html",
  styleUrl: "./stations-update.component.css",
})
export class StationsUpdateComponent implements OnInit {
  @Input() station!: Station;
  @Output() updatedStation = new EventEmitter<Station>();
  actual_states!: any[];
  errors: any = {};

  constructor(
    private stationsUpdateService: StationsUpdateService,
    private stationsDetailComponent: StationsDetailComponent,
  ) {}

  ngOnInit() {
    this.loadActualStates();
    this.station = structuredClone(this.station);
  }

  loadActualStates() {
    this.stationsUpdateService.getStateChoices().subscribe((response) => {
      this.actual_states = response.state_choices;
    });
  }

  updateStation(): void {
    this.station.actual_state = this.station.actual_state
      .toLowerCase()
      .replaceAll(" ", "_");

    this.stationsUpdateService.updateStation(this.station).subscribe({
      next: (updatedStation: Station) => {
        this.station = updatedStation;
        this.errors = {};
        this.stationsDetailComponent.toggleForm();
        this.stationsDetailComponent.loadStation(this.station.id);
      },
      error: (error) => {
        if (error.status === 400) {
          this.errors = error.error;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
