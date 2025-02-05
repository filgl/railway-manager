import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Train } from "../../Models/Train";
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
export class TrainsListService {
  trainsUrl: string = `${environment.apiBaseUrl}/api/trains/`;

  constructor(private http: HttpClient) {}

  getTrains(ordering: string = "lower_model"): Observable<Train[]> {
    return this.http.get<Train[]>(
      `${this.trainsUrl}?ordering=${ordering}`,
      httpOptions,
    );
  }

  addTrain(train: Train): Observable<Train> {
    return this.http.post<Train>(this.trainsUrl, train, httpOptions).pipe(
      catchError((error: HttpErrorResponse): Observable<never> => {
        return throwError((): HttpErrorResponse => error);
      }),
    );
  }

  deleteTrain(id: number): Observable<Train> {
    return this.http.delete<Train>(`${this.trainsUrl}${id}/`, httpOptions);
  }
}
