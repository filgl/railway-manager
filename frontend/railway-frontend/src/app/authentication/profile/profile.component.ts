import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/User";
import { ProfileService } from "./profile.service";
import { NgIf } from "@angular/common";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";
import { UserUpdateComponent } from "../user-update/user-update.component";

@Component({
  selector: "app-profile",
  imports: [NgIf, UserUpdateComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  user!: User;
  showForm!: boolean;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  loadUser(): void {
    this.profileService.getProfile().subscribe((user) => {
      this.user = user;
    });
  }

  deleteUser(): void {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      this.profileService.deleteUser().subscribe({
        next: () => {
          this.authService.logout();
          this.route.navigate(["/"]);
        },
        error: (err) => {
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
