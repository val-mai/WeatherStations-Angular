import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl: String = environment.apiURL;

  getNetworkStatistics(date: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('date', date);
    return this.http.get(`${this.apiUrl}/stats/network`, {
      params: queryParams,
    });
  }
}
