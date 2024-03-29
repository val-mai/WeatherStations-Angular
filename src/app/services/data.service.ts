import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { IWindDistribution } from '../interfaces/IWindDistribution';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private apiUrl: String = environment.apiURL + '/data';

  getRealtimeData(id: string) {
    return this.http.get(`${this.apiUrl}/live/${id}`);
  }

  getDailyHistory(id: string) {
    return this.http.get(`${this.apiUrl}/history/daily/${id}`);
  }

  getDailyWindDistribution(observations: any) {
    return this.http.post<IWindDistribution>(
      `${this.apiUrl}/history/daily/wind`,
      observations
    );
  }

  getHistory(id: string, start: any, end: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('start', start);
    queryParams = queryParams.append('end', end);
    return this.http.get(`${this.apiUrl}/history/${id}`, {
      params: queryParams,
    });
  }
}
