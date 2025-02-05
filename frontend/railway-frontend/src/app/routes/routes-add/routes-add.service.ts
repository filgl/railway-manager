import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
export class RoutesAddService {
  routeTypeChoicesUrl: string = `${environment.apiBaseUrl}/api/route-type-choices/`;
  actualStateChoicesUrl: string = `${environment.apiBaseUrl}/api/state-choices/`;
  electrificationChoicesUrl: string = `${environment.apiBaseUrl}/api/electrification-choices/`;

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
