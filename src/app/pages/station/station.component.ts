import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, type OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HistoryTableComponent } from 'src/app/components/history-table/history-table.component';
import { MetricWidgetComponent } from 'src/app/components/metric-widget/metric-widget.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { Metric } from 'src/app/interfaces/metric';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    FontAwesomeModule,
    SpinnerComponent,
    HistoryTableComponent,
    MatExpansionModule,
    FooterComponent,
    ToolbarComponent,
    MetricWidgetComponent,
    ChartComponent
  ],
  template: `
    <div class="main mat-app-background">
    <app-toolbar></app-toolbar>
      <div class="container mt-4">
        <h2>{{ name }}</h2>
        @if (options) {
        <p>Last update: {{ time | date : 'medium' }}</p>
        <div class="row">
          <app-metric-widget class="col-md-4" [metric]="metrics"></app-metric-widget>
          <div class="col-md-4 map" leaflet [leafletOptions]="options">
            <div *ngIf="layer" [leafletLayer]="layer"></div>
          </div>
          <div class="image col-md-4">
            <img src={{image}} alt="">
          </div>
          <!-- <app-metric-widget class="col-md-4" [metric]="metrics"></app-metric-widget> -->
        </div>

        <!-- <div class="chart mt-3">
          <app-chart *ngIf="chartData" [data]="chartData"></app-chart>
        </div> -->

                   <mat-expansion-panel class="mt-3 mb-4">
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
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './station.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class StationComponent implements OnInit {
  metrics!: Metric[];
  options!: any;
  layer!: any;
  name!: string;
  image!: string;
  time!: any;
  tableData!: any;
  chartData!: any;

  initMap(latitude: number, longitude: number) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: '...',
        }),
      ],
      zoom: 12,
      center: latLng(latitude, longitude),
    };

    this.layer = circleMarker([latitude, longitude], { radius: 20 });
  }

  deviceId!: any;

  constructor(private service: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.getData(this.deviceId);
  }

  private getData(id: string): void {
    this.service
      .getDeviceById(id)
      .subscribe((resp: any) => {
        this.image = resp.image;
        this.name = resp.name;
      })
    this.service.getDevicesInfo(id).subscribe((resp: any) => {
      this.time = new Date(resp.weatherData.time);
      const latitude = resp.latitude;
      const longitude = resp.longitude;
      this.metrics = resp.weatherData;
      this.initMap(latitude, longitude);
    });

    this.service.getDailyHistory(id).subscribe((data: any) => {
      this.tableData = data.temperature.data.map((entry: any) => ({
        time: entry.time,
        temperature: entry.value,
        pressure: data.pressure.data.find((p: any) => p.time === entry.time)
          .value,
        humidity: data.humidity.data.find((p: any) => p.time === entry.time)
          .value,
        windSpeed: data.windSpeed.data.find((w: any) => w.time === entry.time)
          .value,
      }));

      this.chartData = this.tableData.map((entry: any) => ({
        temperature: entry.temperature,
        time: entry.time
      }));

      console.log(this.tableData)
      console.log(this.chartData)

    });
  }
}
