import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";
import { StationsAddService } from "./stations-add.service";

@Component({
  selector: "app-stations-add",
  imports: [FormsModule, NgForOf, NgIf],
  templateUrl: "./stations-add.component.html",
  styleUrl: "./stations-add.component.css",
})
export class StationsAddComponent implements OnInit {
  station: any = {};
  actual_states!: any[];
  @Input() errors: any = {};
  @Output() addStationEvent: EventEmitter<any> = new EventEmitter();

  constructor(private stationsAddService: StationsAddService) {}

  ngOnInit() {
    this.loadActualStates();
  }

  loadActualStates(): void {
    this.stationsAddService
      .getStateChoices()
      .subscribe((response: { state_choices: any[] }): void => {
        this.actual_states = response.state_choices;
      });
  }

  onSubmit(): void {
    this.addStationEvent.emit(this.station);
  }

  resetForm(): void {
    this.station = {};
  }
}
