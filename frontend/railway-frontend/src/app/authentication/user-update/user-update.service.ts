import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { User } from "../../Models/User";

@Injectable({
  providedIn: "root",
})
export class UserUpdateService {
  updateUrl: string = "http://localhost:8000/auth/profile/";

  constructor(private http: HttpClient) {}

  updateProfile(user: User): Observable<User> {
    const token: string | null = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      }),
    };

    return this.http.put<User>(this.updateUrl, user, httpOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        return throwError((): HttpErrorResponse => error);
      }),
    );
  }
}
