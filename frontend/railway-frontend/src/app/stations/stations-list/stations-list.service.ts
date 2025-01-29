import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Station } from "../../Models/Station";

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
}
