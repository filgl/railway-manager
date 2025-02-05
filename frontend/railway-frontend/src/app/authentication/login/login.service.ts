import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class LoginService {
  loginUrl = `${environment.apiBaseUrl}/auth/login/`;

  constructor(private http: HttpClient) {}

  login(
    username: string,
    password: string,
  ): Observable<{ token: string; username: string }> {
    return this.http
      .post<{
        token: string;
        username: string;
      }>(this.loginUrl, { username, password }, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          return throwError((): HttpErrorResponse => error);
        }),
      );
  }
}
