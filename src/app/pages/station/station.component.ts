import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloud, faDroplet, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { HistoryTableComponent } from 'src/app/components/history-table/history-table.component';
import { MetricCardComponent } from 'src/app/components/metric-card/metric-card.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Metric } from 'src/app/interfaces/metric';
import { DeviceService } from 'src/app/services/device.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [
    CommonModule, MetricCardComponent, LeafletModule, FontAwesomeModule, SpinnerComponent, HistoryTableComponent, MatExpansionModule
  ],
  template: `

    <div class="container mt-4">

      <h2>{{name}}</h2>
      @if (options) {
          <p>Last update: {{ time | date : 'medium' }}</p>
    
          <div class="cards mb-3">
            <app-metric-card
              *ngFor="let metric of metrics"
              [metric]="metric"
            ></app-metric-card>
          </div>
          <div class="map" leaflet [leafletOptions]="options">
            <div *ngIf="layer" [leafletLayer]="layer"></div>
          </div>
          <mat-expansion-panel class="my-3">
            <mat-expansion-panel-header>
              <mat-panel-title>
                Tabella Ultime 24h
              </mat-panel-title>
          </mat-expansion-panel-header>
          <app-history-table *ngIf="tableData" [dataSource]="tableData"></app-history-table>
        </mat-expansion-panel>
      } @else {
        <app-spinner></app-spinner>
      }
    </div>

  `,
  styleUrl: './station.component.scss'
})
export class StationComponent implements OnInit {

  metrics!: Metric[];
  options!: any;
  layer!: any;
  name!: string;
  time!: any;
  tableData!: any;

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

  deviceId!: any;

  constructor(private service: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get("id");
    this.getData(this.deviceId);
  }

  private getData(id: string): void {
    this.service.getDeviceById(id).subscribe((resp: any) => this.name = resp.name)
    this.service.getDevicesInfo(id).subscribe((resp: any) => {
      this.time = new Date(resp.weatherData.temperature.time);
      const latitude = resp.latitude;
      const longitude = resp.longitude;
      this.metrics = [];
      this.metrics.push({
        title: 'Temperatura',
        value: resp.weatherData.temperature.value,
        unit: resp.weatherData.temperature.unit,
        device: resp.name,
        icon: faTemperatureHalf,
        last_update: new Date(resp.weatherData.temperature.time),
      });
      this.metrics.push({
        title: 'Pressione',
        value: resp.weatherData.pressure.value,
        unit: resp.weatherData.pressure.unit,
        device: resp.name,
        icon: faCloud,
        last_update: new Date(resp.weatherData.pressure.time),
      });
      this.metrics.push({
        title: 'Umidità',
        value: resp.weatherData.humidity.value,
        unit: resp.weatherData.humidity.unit,
        device: resp.name,
        icon: faDroplet,
        last_update: new Date(resp.weatherData.humidity.time),
      });
      this.metrics.push({
        title: 'Vento',
        value: resp.weatherData.windSpeed.value,
        unit: resp.weatherData.windSpeed.unit,
        device: resp.name,
        icon: faWind,
        last_update: new Date(resp.weatherData.windSpeed.time),
      });
      this.initMap(latitude, longitude);
    });

    this.service.getDailyHistory(id).subscribe(
      (data: any) => {
        console.log(data);
        this.tableData = data.temperature.data.map((entry: any) => ({
          time: entry.time,
          temperature: entry.value,
          pressure: data.pressure.data.find((p: any) => p.time === entry.time).value,
          humidity: data.humidity.data.find((p: any) => p.time === entry.time).value,
          windSpeed: data.windSpeed.data.find((w: any) => w.time === entry.time).value,
        }));

        console.log(this.tableData);
      }
    )

  }

}
