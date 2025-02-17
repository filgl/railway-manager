import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Route } from "../../Models/Route";
import { environment } from "../../environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RoutesUpdateService {
  routesUrl = `${environment.apiBaseUrl}/api/routes/`;
  typeChoicesUrl = `${environment.apiBaseUrl}/api/route-type-choices/`;
  stateChoicesUrl = `${environment.apiBaseUrl}/api/state-choices/`;
  electrificationChoicesUrl = `${environment.apiBaseUrl}/api/electrification-choices/`;

  constructor(private http: HttpClient) {}

  updateRoute(route: Route): Observable<Route> {
    return this.http
      .put<Route>(`${this.routesUrl}${route.id}/`, route, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  getTypeChoices() {
    return this.http.get<{ route_type_choices: any[] }>(
      this.typeChoicesUrl,
      httpOptions,
    );
  }

  getStateChoices() {
    return this.http.get<{ state_choices: any[] }>(
      this.stateChoicesUrl,
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
