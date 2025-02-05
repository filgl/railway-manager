import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Station } from "../../Models/Station";
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
export class StationsListService {
  stationsUrl: string = `${environment.apiBaseUrl}/api/stations/`;

  constructor(private http: HttpClient) {}

  getStations(ordering: string = "lower_name"): Observable<Station[]> {
    return this.http.get<Station[]>(
      `${this.stationsUrl}?ordering=${ordering}`,
      httpOptions,
    );
  }

  addStation(station: Station): Observable<Station> {
    return this.http.post<Station>(this.stationsUrl, station, httpOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        return throwError((): HttpErrorResponse => error);
      }),
    );
  }

  deleteStation(id: number): Observable<Station> {
    return this.http.delete<Station>(`${this.stationsUrl}${id}/`, httpOptions);
  }
}
