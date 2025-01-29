import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { Station } from "../../Models/Station";
import { StationsAddService } from "./stations-add.service";

@Component({
  selector: "app-stations-add",
  imports: [FormsModule, NgForOf],
  templateUrl: "./stations-add.component.html",
  styleUrl: "./stations-add.component.css",
})
export class StationsAddComponent implements OnInit {
  station: any = {};
  actual_states!: any[];
  @Output() addStationEvent: EventEmitter<any> = new EventEmitter();

  constructor(private stationsAddService: StationsAddService) {}

  ngOnInit() {
    this.loadActualStates();
  }

  loadActualStates() {
    this.stationsAddService.getStateChoices().subscribe((response) => {
      this.actual_states = response.state_choices;
    });
  }

  onSubmit(): void {
    const station = this.station;
    this.addStationEvent.emit(station);
  }
}
