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
export class TrainsAddService {
  actualStateChoicesUrl: string = "http://localhost:8000/api/state-choices/";

  constructor(private http: HttpClient) {}

  getActualStateChoices(): Observable<{ state_choices: any[] }> {
    return this.http.get<{ state_choices: any[] }>(
      this.actualStateChoicesUrl,
      httpOptions,
    );
  }
}
