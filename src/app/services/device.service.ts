import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http: HttpClient, private auth:AuthService) { }

  private apiUrl: String = environment.apiURL;

  getAllDevices() {
    return this.http.get(`${this.apiUrl}/devices`);
  }

  getDeviceById(id: string) {
    return this.http.get(`${this.apiUrl}/devices/${id}`);
  }

  updateDevice(id: string, device:any) {
    return this.http.put(`${this.apiUrl}/devices/${id}`, device, {'headers': this.auth.getHeaders()});
  }

}
