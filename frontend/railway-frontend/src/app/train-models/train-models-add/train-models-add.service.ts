import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class TrainModelsAddService {
  trainModelChoicesUrl = "http://localhost:8000/api/train-model-choices/";
  powerSystemChoicesUrl = "http://localhost:8000/api/power-system-choices/";
  compositionChoicesUrl = "http://localhost:8000/api/composition-choices/";

  constructor(private http: HttpClient) {}

  getTrainModelChoices() {
    return this.http.get<{ train_model_choices: any[] }>(
      this.trainModelChoicesUrl,
      httpOptions,
    );
  }

  getPowerSystemChoices() {
    return this.http.get<{ power_system_choices: any[] }>(
      this.powerSystemChoicesUrl,
      httpOptions,
    );
  }

  getCompositionChoices() {
    return this.http.get<{ composition_choices: any[] }>(
      this.compositionChoicesUrl,
      httpOptions,
    );
  }
}
