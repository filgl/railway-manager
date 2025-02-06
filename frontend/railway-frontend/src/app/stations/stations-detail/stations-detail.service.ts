import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Station } from "../../Models/Station";
import { Observable } from "rxjs";
import { environment } from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsDetailService {
  stationDetailUrl: string = `${environment.apiBaseUrl}/api/stations/`;

  constructor(private http: HttpClient) {}

  getStation(id: number | null): Observable<Station> {
    return this.http.get<Station>(
      `${this.stationDetailUrl}${id}/`,
      httpOptions,
    );
  }
}
