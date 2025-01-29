import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TrainModel } from "../../Models/TrainModel";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainModelsDetailService {
  trainModelDetailUrl = `http://localhost:8000/api/train-models/`;

  constructor(private http: HttpClient) {}

  getTrainModel(id: string | null) {
    return this.http.get<TrainModel>(
      `${this.trainModelDetailUrl}${id}`,
      httpOptions,
    );
  }
}
