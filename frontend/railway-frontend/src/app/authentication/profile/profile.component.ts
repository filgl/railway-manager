import { Component, OnInit } from "@angular/core";
import { User } from "../../Models/User";
import { ProfileService } from "./profile.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-profile",
  imports: [NgIf],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  user!: User;
  error!: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.profileService.getProfile().subscribe((data) => {
      this.user = data;
    });
  }
}
