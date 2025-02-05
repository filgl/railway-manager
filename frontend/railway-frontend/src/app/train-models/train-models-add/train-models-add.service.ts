import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
export class TrainModelsAddService {
  trainModelChoicesUrl: string = `${environment.apiBaseUrl}/api/train-model-choices/`;
  powerSystemChoicesUrl: string = `${environment.apiBaseUrl}/api/power-system-choices/`;
  compositionChoicesUrl: string = `${environment.apiBaseUrl}/api/composition-choices/`;

  constructor(private http: HttpClient) {}

  getTrainModelChoices(): Observable<{ train_model_choices: any[] }> {
    return this.http.get<{ train_model_choices: any[] }>(
      this.trainModelChoicesUrl,
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
