import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../../Models/User";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  profileUrl = "http://localhost:8000/auth/profile/";
  deleteUrl = "http://localhost:8000/auth/delete/";

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
      }),
    };

    return this.http.get<User>(this.profileUrl, httpOptions);
  }

  deleteUser(): Observable<User> {
    const token = localStorage.getItem("token");
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
      }),
    };

    return this.http.delete<User>(this.deleteUrl, httpOptions);
  }
}
