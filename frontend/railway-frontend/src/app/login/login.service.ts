import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  loginUrl = "http://localhost:8000/auth/login/";
  error!: string;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log("Sending login...");
    return this.http
      .post<{
        token: string;
        username: string;
      }>(this.loginUrl, { username, password }, httpOptions)
      .pipe(
        tap((response) => console.log("Login response:", response)),
        catchError((error) => {
          console.error("Login error: ", error);
          return throwError(error);
        }),
      );
  }
}
