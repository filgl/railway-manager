import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RoutesAddService {
  routeTypeChoicesUrl: string = "http://localhost:8000/api/route-type-choices/";
  actualStateChoicesUrl: string = "http://localhost:8000/api/state-choices/";
  electrificationChoicesUrl: string =
    "http://localhost:8000/api/electrification-choices/";

  constructor(private http: HttpClient) {}

  getRouteTypeChoices(): Observable<{ route_type_choices: any }> {
    return this.http.get<{ route_type_choices: any[] }>(
      this.routeTypeChoicesUrl,
      httpOptions,
    );
  }

  getActualStateChoices(): Observable<{ state_choices: any }> {
    return this.http.get<{ state_choices: any[] }>(
      this.actualStateChoicesUrl,
      httpOptions,
    );
  }

  getElectrificationChoices(): Observable<{ electrification_choices: any }> {
    return this.http.get<{ electrification_choices: any[] }>(
      this.electrificationChoicesUrl,
      httpOptions,
    );
  }
}
