import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Train } from "../../Models/Train";
import { catchError, Observable, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainsListService {
  trainsUrl = "http://localhost:8000/api/trains/";

  constructor(private http: HttpClient) {}

  getTrains() {
    return this.http.get<Train[]>(this.trainsUrl, httpOptions);
  }

  addTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(this.trainsUrl, train, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      }),
    );
  }
}
