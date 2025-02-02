import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class StationsAddService {
  stateChoicesUrl: string = "http://localhost:8000/api/state-choices/";

  constructor(private http: HttpClient) {}

  getStateChoices(): Observable<{ state_choices: any[] }> {
    return this.http.get<{ state_choices: any[] }>(
      this.stateChoicesUrl,
      httpOptions,
    );
  }
}
