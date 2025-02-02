import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Route } from "../../Models/Route";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RoutesDetailService {
  routeDetailUrl: string = `http://localhost:8000/api/routes/`;

  constructor(private http: HttpClient) {}

  getRoute(id: number | null): Observable<Route> {
    return this.http.get<Route>(`${this.routeDetailUrl}${id}`, httpOptions);
  }
}
