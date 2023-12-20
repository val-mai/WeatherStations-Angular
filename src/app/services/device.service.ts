import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  getDevicesInfo(id:string) {
    return this.http.get("http://localhost:8080/info/" + id);
  }

  getAllDevices() {
    return this.http.get("http://localhost:8080/devices");
  }

}
