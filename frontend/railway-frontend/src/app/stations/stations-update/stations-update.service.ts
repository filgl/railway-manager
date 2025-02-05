import { Injectable } from "@angular/core";
import { Station } from "../../Models/Station";
import { catchError, Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { environment } from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsUpdateService {
  stationsUrl: string = `${environment.apiBaseUrl}/api/stations/`;
  stateChoicesUrl: string = `${environment.apiBaseUrl}/api/state-choices/`;

  constructor(private http: HttpClient) {}

  updateStation(station: Station): Observable<Station> {
    return this.http
      .put<Station>(`${this.stationsUrl}${station.id}/`, station, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          return throwError((): HttpErrorResponse => error);
        }),
      );
  }

  getStateChoices(): Observable<{ state_choices: any[] }> {
    return this.http.get<{ state_choices: any[] }>(
      this.stateChoicesUrl,
      httpOptions,
    );
  }
}
