import { Component } from "@angular/core";
import { LoginService } from "./login.service";
import { AuthService } from "../../auth.service";
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-login",
  imports: [FormsModule, NgIf, RouterLink],
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

  login(): void {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res: { token: string; username: string }): void => {
        this.authService.login(res.token, res.username);
        this.router.navigate(["/"]);
      },
      error: (err: any): void => {
        if (err.status === 400) {
          this.error = err.error.error;
        } else {
          alert("An unexpected error occurred.");
        }
      },
    });
  }
}
