import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { TrainModel } from "../../Models/TrainModel";
import { catchError, Observable, throwError } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainModelsListService {
  trainModelsUrl: string = "http://localhost:8000/api/train-models/";

  constructor(private http: HttpClient) {}

  getTrainModels(ordering: string = "lower_name"): Observable<TrainModel[]> {
    return this.http.get<TrainModel[]>(
      `${this.trainModelsUrl}?ordering=${ordering}`,
      httpOptions,
    );
  }

  addTrainModel(trainModel: TrainModel): Observable<TrainModel> {
    return this.http
      .post<TrainModel>(this.trainModelsUrl, trainModel, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          return throwError((): HttpErrorResponse => error);
        }),
      );
  }

  deleteTrainModel(id: number): Observable<TrainModel> {
    return this.http.delete<TrainModel>(
      `${this.trainModelsUrl}${id}/`,
      httpOptions,
    );
  }
}
