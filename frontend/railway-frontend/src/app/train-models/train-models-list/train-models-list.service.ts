import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { TrainModel } from "../../Models/TrainModel";
import { Station } from "../../Models/Station";
import { catchError, Observable, throwError } from "rxjs";
import { Train } from "../../Models/Train";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainModelsListService {
  trainModelsUrl = "http://localhost:8000/api/train-models/";

  constructor(private http: HttpClient) {}

  getTrainModels() {
    return this.http.get<TrainModel[]>(this.trainModelsUrl, httpOptions);
  }

  addTrainModel(trainModel: TrainModel): Observable<TrainModel> {
    return this.http
      .post<TrainModel>(this.trainModelsUrl, trainModel, httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
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
