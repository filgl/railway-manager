import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UserUpdateService } from "./user-update.service";
import { User } from "../../Models/User";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: "app-user-update",
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: "./user-update.component.html",
  styleUrl: "./user-update.component.css",
})
export class UserUpdateComponent implements OnInit {
  @Input() user!: User;
  @Output() updatedUser: EventEmitter<User> = new EventEmitter<User>();
  errors: any = {};

  constructor(
    private userUpdateService: UserUpdateService,
    private userProfileComponent: ProfileComponent,
  ) {}

  ngOnInit(): void {
    this.user = structuredClone(this.user);
  }

  updateUser(): void {
    this.userUpdateService.updateProfile(this.user).subscribe({
      next: (updatedUser: User): void => {
        this.user = updatedUser;
        this.errors = {};
        this.userProfileComponent.toggleForm();
        this.userProfileComponent.loadUser();
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
}
