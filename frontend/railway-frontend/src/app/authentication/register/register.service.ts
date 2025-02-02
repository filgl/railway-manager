import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  registerUrl: string = "http://localhost:8000/auth/register/";

  constructor(private http: HttpClient) {}

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Observable<{ token: string; username: string }> {
    return this.http
      .post<{ token: string; username: string }>(
        this.registerUrl,
        {
          username: username,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
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
