import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../../Models/User";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class PasswordResetService {
  resetUrl: string = "http://localhost:8000/auth/password-reset/";

  constructor(private http: HttpClient) {}

  resetPassword(
    username: string,
    oldPassword: string,
    newPassword: string,
  ): Observable<User> {
    return this.http
      .post<User>(
        this.resetUrl,
        {
          username,
          old_password: oldPassword,
          new_password: newPassword,
        },
        httpOptions,
      )
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          return throwError((): HttpErrorResponse => error);
        }),
      );
  }
}
