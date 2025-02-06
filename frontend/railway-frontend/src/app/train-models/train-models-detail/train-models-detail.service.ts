import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TrainModel } from "../../Models/TrainModel";
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
export class TrainModelsDetailService {
  trainModelDetailUrl: string = `${environment.apiBaseUrl}/api/train-models/`;

  constructor(private http: HttpClient) {}

  getTrainModel(id: number | null): Observable<TrainModel> {
    return this.http.get<TrainModel>(
      `${this.trainModelDetailUrl}${id}/`,
      httpOptions,
    );
  }
}
