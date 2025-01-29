import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Station} from '../../Models/Station';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class StationsDetailService {
  stationDetailUrl = `http://localhost:8000/api/stations/`;

  constructor(private http: HttpClient) { }

  getStation(id: string | null) {
    return this.http.get<Station>(`${this.stationDetailUrl}${id}`, httpOptions);
  }
}
