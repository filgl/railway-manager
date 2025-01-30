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
export class TrainsAddService {
  actualStateChoicesUrl = "http://localhost:8000/api/state-choices/";

  constructor(private http: HttpClient) {}

  getActualStateChoices() {
    return this.http.get<{ state_choices: any[] }>(
      this.actualStateChoicesUrl,
      httpOptions,
    );
  }
}
