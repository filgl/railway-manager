import { Injectable } from "@angular/core";
import { Station } from "../../Models/Station";
import { catchError, Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsUpdateService {
  stationsUrl = "http://localhost:8000/api/stations/";
  stateChoicesUrl = "http://localhost:8000/api/state-choices/";

  constructor(private http: HttpClient) {}

  updateStation(station: Station): Observable<Station> {
    return this.http
      .put<Station>(`${this.stationsUrl}${station.id}/`, station, httpOptions)
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
