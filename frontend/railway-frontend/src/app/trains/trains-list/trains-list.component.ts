import { Component, OnInit, ViewChild } from "@angular/core";
import { Train } from "../../Models/Train";
import { TrainsListService } from "./trains-list.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { TrainsAddComponent } from "../trains-add/trains-add.component";
import { AuthService } from "../../auth.service";
import { Title } from "@angular/platform-browser";

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
  currentSorting: string = "lower_model";
  @ViewChild(TrainsAddComponent) trainsAddComponent!: TrainsAddComponent;

  constructor(
    private trainsListService: TrainsListService,
    protected authService: AuthService,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Trains list - Railway Manager");
    this.loadTrains();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadTrains(ordering: string = "lower_model"): void {
    this.trainsListService
      .getTrains(ordering)
      .subscribe((trains: Train[]): void => {
        this.trains = trains;
        this.currentSorting = ordering;
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
