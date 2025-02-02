import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Station } from "../../Models/Station";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsDetailService {
  stationDetailUrl: string = `http://localhost:8000/api/stations/`;

  constructor(private http: HttpClient) {}

  getStation(id: number | null): Observable<Station> {
    return this.http.get<Station>(`${this.stationDetailUrl}${id}`, httpOptions);
  }
}
