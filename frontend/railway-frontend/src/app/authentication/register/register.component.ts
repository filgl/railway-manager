import { Component, Input, OnInit } from "@angular/core";
import { User } from "../../Models/User";
import { RegisterService } from "./register.service";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-register",
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  error!: string;
  errors: any = {};

  constructor(
    private registerService: RegisterService,
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.error = "Passwords do not match";
      return;
    } else {
      this.error = "";
    }

    this.errors = {};

    this.registerService
      .register(
        this.username,
        this.firstName,
        this.lastName,
        this.email,
        this.password,
      )
      .subscribe({
        next: (res) => {
          this.authService.login(res.token, res.username);
          this.router.navigate(["/profile"]);
        },
        error: (err) => {
          if (err.status === 400) {
            this.errors = err.error;
          } else {
            alert("An unexpected error occurred.");
          }
        },
      });
  }
}
