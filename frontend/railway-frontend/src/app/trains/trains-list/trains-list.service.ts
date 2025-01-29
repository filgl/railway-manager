import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Train} from '../../Models/Train';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TrainsListService {
  trainsUrl = 'http://localhost:8000/api/trains/';

  constructor(private http: HttpClient) { }

  getTrains() {
    return this.http.get<Train[]>(this.trainsUrl, httpOptions);
  }
}
