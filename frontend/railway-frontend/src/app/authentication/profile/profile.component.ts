import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/User";
import { ProfileService } from "./profile.service";
import { NgIf } from "@angular/common";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  imports: [NgIf],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  user!: User;
  error!: string;

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
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
        error: () => {
          this.error = "Failed to delete user";
        },
      });
    }
  }
}
