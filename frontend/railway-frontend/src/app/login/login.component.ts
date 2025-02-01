import { Component } from "@angular/core";
import { LoginService } from "./login.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgForOf, NgIf } from "@angular/common";

@Component({
  selector: "app-login",
  imports: [FormsModule, NgIf],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  username!: string;
  password!: string;
  error!: string;

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.authService.login(res.token, res.username);
        this.router.navigate(["/"]);
      },
      error: () => {
        this.error = "Invalid login credentials";
      },
    });
  }
}
