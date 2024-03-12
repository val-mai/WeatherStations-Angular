import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  getNetworkStatistics() {
    return {
      "date": "12-03-2024",
      "mostCold" : [
        {
          "device":"6582c9e1a6eeb83915b4ceab",
          "time": 1710245558000,
          "value" : 1.2
        },
        {
          "device":"6582c9e1a6eeb83915b4ceab",
          "time": 1710274358000,
          "value" : 2.4
        },
        {
          "device":"6582c9e1a6eeb83915b4ceab",
          "time": 1710274358000,
          "value" : 2.6
        },
      ]
    }
  }

}
