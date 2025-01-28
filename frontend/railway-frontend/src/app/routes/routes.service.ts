import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Route} from '../Models/Route';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root',
})
export class RoutesService {
  routesUrl = 'http://localhost:8000/api/routes';

  constructor(private http: HttpClient) { }

  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl, httpOptions);
  }
}
