import { Component, OnInit, ViewChild } from "@angular/core";
import { Train } from "../../Models/Train";
import { TrainsListService } from "./trains-list.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TrainsAddComponent } from "../trains-add/trains-add.component";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-trains-list",
  imports: [NgForOf, RouterLink, NgIf, TrainsAddComponent, NgClass],
  templateUrl: "./trains-list.component.html",
  styleUrl: "./trains-list.component.css",
})
export class TrainsListComponent implements OnInit {
  trains!: Train[];
  showForm: boolean = false;
  errors: any = {};
  @ViewChild(TrainsAddComponent) trainsAddComponent!: TrainsAddComponent;

  constructor(
    private trainsListService: TrainsListService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadTrains();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrains(): void {
    this.trainsListService.getTrains().subscribe((trains: Train[]): void => {
      this.trains = trains;
    });
  }

  addTrain(train: Train): void {
    this.trainsListService.addTrain(train).subscribe({
      next: (): void => {
        this.loadTrains();
        this.errors = {};
        this.trainsAddComponent.resetForm();
        this.showForm = false;
      },
      error: (error: any): void => {
        if (error.status === 400) {
          this.errors = error.error;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }

  deleteTrain(train: Train): void {
    if (
      confirm(
        "Are you sure you want to delete this train? This action cannot be undone.",
      )
    ) {
      this.trainsListService.deleteTrain(train.id).subscribe({
        next: (): void => {
          this.loadTrains();
        },
        error: (err: any): void => {
          if (err.status === 400) {
            alert(err.error.error);
          } else {
            alert("An unexpected error occurred.");
          }
        },
      });
    }
  }
}
