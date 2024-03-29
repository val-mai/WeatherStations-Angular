import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl: String = environment.apiURL;

  getAllDevices() {
    return this.http.get(`${this.apiUrl}/devices`);
  }

  getDeviceById(id: string) {
    return this.http.get(`${this.apiUrl}/devices/${id}`);
  }

  getDeviceImages(id: string) {
    return this.http.get(`${this.apiUrl}/devices/${id}/images`);
  }

  updateDevice(id: string, device: any) {
    return this.http.put(`${this.apiUrl}/devices/${id}`, device, {
      headers: this.auth.getHeaders(),
    });
  }

  updateDeviceImages(id: string, deviceImages: any) {
    return this.http.put(`${this.apiUrl}/devices/${id}/images`, deviceImages, {
      headers: this.auth.getHeaders(),
    });
  }

  insertDevice(device: any) {
    return this.http.post(`${this.apiUrl}/devices`, device, {
      headers: this.auth.getHeaders(),
    });
  }

  deleteDevice(id: string) {
    return this.http.delete(`${this.apiUrl}/devices/${id}`, {
      headers: this.auth.getHeaders(),
    });
  }
}
