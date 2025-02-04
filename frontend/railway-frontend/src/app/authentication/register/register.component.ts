import { Component, OnInit } from "@angular/core";
import { RegisterService } from "./register.service";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-register",
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
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
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Registration - Railway Manager");
  }

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.error = "Passwords do not match";
      this.errors = {};
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
        next: (res: { token: string; username: string }): void => {
          this.authService.login(res.token, res.username);
          this.router.navigate(["/profile"]);
        },
        error: (err: any): void => {
          if (err.status === 400) {
            this.errors = err.error;
            this.error = "";
          } else {
            alert("An unexpected error occurred.");
          }
        },
      });
  }
}
