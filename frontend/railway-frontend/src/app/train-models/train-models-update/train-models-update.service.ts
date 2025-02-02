import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { TrainModel } from "../../Models/TrainModel";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainModelsUpdateService {
  trainModelsUrl: string = "http://localhost:8000/api/train-models/";
  typeChoicesUrl: string = "http://localhost:8000/api/train-model-choices/";
  powerSystemChoicesUrl: string =
    "http://localhost:8000/api/power-system-choices/";
  compositionChoicesUrl: string =
    "http://localhost:8000/api/composition-choices/";

  constructor(private http: HttpClient) {}

  updateTrainModel(trainModel: TrainModel): Observable<TrainModel> {
    return this.http
      .put<TrainModel>(
        `${this.trainModelsUrl}${trainModel.id}/`,
        trainModel,
        httpOptions,
      )
      .pipe(
        catchError((error: HttpErrorResponse): Observable<never> => {
          return throwError((): HttpErrorResponse => error);
        }),
      );
  }

  getTypeChoices(): Observable<{ train_model_choices: any[] }> {
    return this.http.get<{ train_model_choices: any[] }>(
      this.typeChoicesUrl,
      httpOptions,
    );
  }

  getPowerSystemChoices(): Observable<{ power_system_choices: any[] }> {
    return this.http.get<{ power_system_choices: any[] }>(
      this.powerSystemChoicesUrl,
      httpOptions,
    );
  }

  getCompositionChoices(): Observable<{ composition_choices: any[] }> {
    return this.http.get<{ composition_choices: any[] }>(
      this.compositionChoicesUrl,
      httpOptions,
    );
  }
}
