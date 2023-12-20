import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { MetricCardComponent } from 'src/app/components/metric-card/metric-card.component';
import { Metric } from 'src/app/interfaces/metric';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [
    CommonModule,MetricCardComponent, LeafletModule
  ],
  template: `

    <div *ngIf="options" class="container mt-4">

      <h2>{{name}}</h2>
      <p>Last update: {{ time | date : 'medium' }}</p>

      <div class="cards mb-3">
        <app-metric-card
          *ngFor="let metric of metrics"
          [metric]="metric"
        ></app-metric-card>
      </div>

      <div *ngIf="options" class="map" leaflet [leafletOptions]="options">
        <div *ngIf="layer" [leafletLayer]="layer"></div>
      </div>
    </div>

  `,
  styleUrl: './station.component.scss'
})
export class StationComponent implements OnInit {

  metrics: Metric[] = [];
  options!: any;
  layer!: any;
  name!: string;
  time!: any;

  initMap(latitude: number, longitude: number) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 12,
      center: latLng(latitude, longitude),
    };

    this.layer = circleMarker([latitude, longitude], { radius: 25 });
  }

  deviceId!:any;

  constructor(private service: DeviceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get("id");
    this.getData(this.deviceId);
  }

  private getData(id:string): void {
    this.service.getDevicesInfo(id).subscribe((resp: any) => {
      console.log(resp);
      this.name = resp.name;
      this.time = new Date(resp.weatherData.temperature.time);
      const latitude = resp.latitude;
      const longitude = resp.longitude;
      this.metrics = [];
      this.metrics.push({
        title: 'Temperatura',
        value:
          resp.weatherData.temperature.value +
          ' ' +
          resp.weatherData.temperature.unit,
        device: resp.name,
        last_update: new Date(resp.weatherData.temperature.time),
      });
      this.metrics.push({
        title: 'Pressione',
        value:
          resp.weatherData.pressure.value +
          ' ' +
          resp.weatherData.pressure.unit,
        device: resp.name,
        last_update: new Date(resp.weatherData.pressure.time),
      });
      this.metrics.push({
        title: 'Vento',
        value:
          resp.weatherData.windSpeed.value +
          ' ' +
          resp.weatherData.windSpeed.unit,
        device: resp.name,
        last_update: new Date(resp.weatherData.windSpeed.time),
      });
      this.initMap(latitude, longitude);
    });
  }

}
