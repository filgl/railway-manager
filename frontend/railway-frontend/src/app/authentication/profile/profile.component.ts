import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/User";
import { ProfileService } from "./profile.service";
import { NgClass, NgIf } from "@angular/common";
import { AuthService } from "../../auth.service";
import { Router } from "@angular/router";
import { UserUpdateComponent } from "../user-update/user-update.component";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-profile",
  imports: [NgIf, UserUpdateComponent, NgClass],
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
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Profile - Railway Manager");
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
        next: (): void => {
          this.authService.logout();
          this.route.navigate(["/"]);
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
