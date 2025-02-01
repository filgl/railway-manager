import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  login(token: string, username: string): void {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  getUsername(): string | null {
    return localStorage.getItem("username");
  }
}
