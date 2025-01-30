import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Station } from "../../Models/Station";
import { catchError, Observable, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsListService {
  stationsUrl = "http://localhost:8000/api/stations/";

  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<Station[]>(this.stationsUrl, httpOptions);
  }

  addStation(station: Station): Observable<Station> {
    return this.http.post<Station>(this.stationsUrl, station, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}
