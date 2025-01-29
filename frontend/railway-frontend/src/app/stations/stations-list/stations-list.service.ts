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
export class StationsListService {
  stationsUrl = "http://localhost:8000/api/stations/";

  constructor(private http: HttpClient) {}

  getStations() {
    return this.http.get<Station[]>(this.stationsUrl, httpOptions);
  }

  addStation(station: Station): Observable<Station> {
    return this.http.post<Station>(this.stationsUrl, station, httpOptions);
  }
}
