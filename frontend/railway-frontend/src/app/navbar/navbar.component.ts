import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgIf } from "@angular/common";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-navbar",
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  constructor(protected authService: AuthService) {}
}
