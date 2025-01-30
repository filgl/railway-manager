import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Route } from "../../Models/Route";
import { catchError, Observable, throwError } from "rxjs";
import { Station } from "../../Models/Station";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RoutesListService {
  routesUrl = "http://localhost:8000/api/routes/";

  constructor(private http: HttpClient) {}

  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl, httpOptions);
  }

  addRoute(route: Route): Observable<Route> {
    return this.http.post<Route>(this.routesUrl, route, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}
