import { Component } from "@angular/core";
import { PasswordResetService } from "./password-reset.service";
import { Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-password-reset",
  imports: [NgIf, FormsModule],
  templateUrl: "./password-reset.component.html",
  styleUrl: "./password-reset.component.css",
})
export class PasswordResetComponent {
  username!: string;
  oldPassword!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  errors: any = {};
  error!: string;

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
  ) {}

  resetPassword(): void {
    if (this.newPassword !== this.newPasswordConfirm) {
      this.error = "New passwords do not match";
      this.errors = {};
      return;
    } else {
      this.error = "";
    }

    this.passwordResetService
      .resetPassword(this.username, this.oldPassword, this.newPassword)
      .subscribe({
        next: () => {
          this.router.navigate(["/login"]);
        },
        error: (err) => {
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
