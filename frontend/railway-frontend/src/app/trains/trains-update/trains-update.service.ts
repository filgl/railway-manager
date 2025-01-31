import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Train } from "../../Models/Train";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainsUpdateService {
  trainsUrl = "http://localhost:8000/api/trains/";
  stateChoicesUrl = "http://localhost:8000/api/state-choices/";

  constructor(private http: HttpClient) {}

  updateTrain(train: Train): Observable<Train> {
    return this.http
      .put<Train>(`${this.trainsUrl}${train.id}/`, train, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  getStateChoices() {
    return this.http.get<{ state_choices: any[] }>(
      this.stateChoicesUrl,
      httpOptions,
    );
  }
}
