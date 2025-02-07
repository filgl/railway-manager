import { Component, OnInit } from "@angular/core";
import { PasswordResetService } from "./password-reset.service";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-password-reset",
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: "./password-reset.component.html",
  styleUrl: "./password-reset.component.css",
})
export class PasswordResetComponent implements OnInit {
  username!: string;
  email!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  errors: any = {};
  error!: string;

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle("Password Reset - Railway Manager");
  }

  resetPassword(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.error = "New passwords do not match";
      this.errors = {};
      return;
    } else {
      this.error = "";
    }

    this.passwordResetService
      .resetPassword(this.username, this.email, this.newPassword)
      .subscribe({
        next: (): void => {
          this.router.navigate(["/login"]);
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
