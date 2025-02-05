import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../../Models/User";
import { Observable } from "rxjs";
import { environment } from "../../environment";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  profileUrl: string = `${environment.apiBaseUrl}/auth/profile/`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    const token: string | null = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
      }),
    };

    return this.http.get<User>(this.profileUrl, httpOptions);
  }

  deleteUser(): Observable<User> {
    const token: string | null = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
      }),
    };

    return this.http.delete<User>(this.profileUrl, httpOptions);
  }
}
