import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RoutesAddService {
  routeTypeChoicesUrl = "http://localhost:8000/api/route-type-choices/";
  actualStateChoicesUrl = "http://localhost:8000/api/state-choices/";
  electrificationChoicesUrl =
    "http://localhost:8000/api/electrification-choices/";

  constructor(private http: HttpClient) {}

  getRouteTypeChoices() {
    return this.http.get<{ route_type_choices: any[] }>(
      this.routeTypeChoicesUrl,
      httpOptions,
    );
  }

  getActualStateChoices() {
    return this.http.get<{ state_choices: any[] }>(
      this.actualStateChoicesUrl,
      httpOptions,
    );
  }

  getElectrificationChoices() {
    return this.http.get<{ electrification_choices: any[] }>(
      this.electrificationChoicesUrl,
      httpOptions,
    );
  }
}
