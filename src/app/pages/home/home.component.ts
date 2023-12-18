import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circle, circleMarker, latLng, marker, tileLayer } from 'leaflet';
import { MetricCardComponent } from 'src/app/components/metric-card/metric-card.component';
import { Metric } from 'src/app/interfaces/metric';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, MetricCardComponent, LeafletModule
  ],
  template: `
    <div class="container">
      <app-metric-card *ngFor="let metric of metrics" [metric]="metric"></app-metric-card>
    </div>

    <div *ngIf="options" class="map"
     leaflet 
     [leafletOptions]="options">
     <div *ngIf="layer" [leafletLayer]="layer"></div>
    </div>

  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  metrics: Metric[] = [];
  options!:any;
  layer!:any;

  initMap(latitude:number, longitude:number) {
    this.options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(latitude, longitude)
    };
    
    this.layer = circle([ latitude, longitude ], { radius: 100 });
    
  }

  constructor(private service: DeviceService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {

  }

  private getData(): void {
    this.service.getDevicesInfo().subscribe((resp: any) => {
      console.log(resp);
      const timestamp = resp.data.last_update.outdoor.temperature.time;
      const latitude = resp.data.latitude;
      const longitude = resp.data.longitude;
      this.metrics = [];
      this.metrics.push({
        title: "Temperatura",
        value: resp.data.last_update.outdoor.temperature.value + " " + resp.data.last_update.outdoor.temperature.unit,
        device: resp.data.name,
        lat: latitude,
        lon: longitude,
        last_update: new Date(timestamp * 1000)
      })
      this.metrics.push({
        title: "Pressione",
        value: resp.data.last_update.pressure.relative.value + " " + resp.data.last_update.pressure.relative.unit,
        device: resp.data.name,
        lat: latitude,
        lon: longitude,
        last_update: new Date(timestamp * 1000)
      })
      this.metrics.push({
        title: "Vento",
        value: resp.data.last_update.wind.wind_speed.value + " " + resp.data.last_update.wind.wind_speed.unit,
        device: resp.data.name,
        lat: latitude,
        lon: longitude,
        last_update: new Date(timestamp * 1000)
      });
      this.initMap(latitude,longitude);
    });
  }

}
