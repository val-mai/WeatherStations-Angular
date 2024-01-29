import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl: String = environment.apiURL + "/data";

  getRealtimeData(id: string) {
    return this.http.get(`${this.apiUrl}/live/${id}`);
  }

  getDailyHistory(id: string) {
    return this.http.get(`${this.apiUrl}/history/daily/${id}`);
  }

}
