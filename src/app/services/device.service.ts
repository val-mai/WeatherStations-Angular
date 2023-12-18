import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }

  getDevicesInfo() {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("application_key", "2BE0A47E434D61D1E866A12B03C9574D");
    queryParams = queryParams.append("api_key", "92e76b42-2b76-41c2-9b33-f81c50aaddca");
    queryParams = queryParams.append("mac", "7C:87:CE:BE:93:0F");
    queryParams = queryParams.append("temp_unitid", "1");
    queryParams = queryParams.append("pressure_unitid", "5");
    queryParams = queryParams.append("wind_speed_unitid", "7");
    return this.http.get("https://api.ecowitt.net/api/v3/device/info",{params:queryParams});
  }

}
