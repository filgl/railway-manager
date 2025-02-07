import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Route } from "../../Models/Route";
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
export class RoutesListService {
  routesUrl: string = `${environment.apiBaseUrl}/api/routes/`;

  constructor(private http: HttpClient) {}

  getRoutes(ordering: string = "start_station__name"): Observable<Route[]> {
    return this.http.get<Route[]>(
      `${this.routesUrl}?ordering=${ordering}`,
      httpOptions,
    );
  }

  addRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(this.routesUrl, route, httpOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        return throwError((): HttpErrorResponse => error);
      }),
    );
  }

  deleteRoute(id: number): Observable<Route> {
    return this.http.delete<Route>(`${this.routesUrl}${id}/`, httpOptions);
  }
}
