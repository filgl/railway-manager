import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.isAuthenticated();

    if (
      isAuthenticated &&
      (state.url === "/login" || state.url === "/register")
    ) {
      this.router.navigate(["/profile"]);
      return false;
    }

    if (isAuthenticated && state.url === "/password-reset") {
      this.router.navigate(["/profile"]);
      return false;
    }

    if (!this.authService.isAuthenticated() && state.url === "/profile") {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
