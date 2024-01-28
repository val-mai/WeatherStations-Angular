import { CommonModule } from '@angular/common';
import { Component, OnDestroy, type OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faCircleInfo,
  faIgloo,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HistoryTableComponent } from 'src/app/components/history-table/history-table.component';
import { MetricWidgetComponent } from 'src/app/components/metric-widget/metric-widget.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { StationInfoComponent } from 'src/app/components/station-info/station-info.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { Metric } from 'src/app/interfaces/metric';
import { DeviceService } from 'src/app/services/device.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    FontAwesomeModule,
    SpinnerComponent,
    FooterComponent,
    ToolbarComponent,
    HistoryTableComponent,
    MetricWidgetComponent,
    MatTabsModule,
    StationInfoComponent,
    ChartComponent,
    MatExpansionModule
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container mt-4">
        <h2>{{infoData.name}}</h2>
        @if (options) {
        <p>Last update: {{ time | date : 'medium' }}</p>
        <mat-tab-group color="accent" [selectedIndex]="selectedTabIndex" (selectedIndexChange)="tabChanged($event)">
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faIgloo"></fa-icon>
              HOME
            </ng-template>
            <div class="row inserted mt-2 mb-4 g-2">
              <app-metric-widget
                class="col-md-4"
                [metric]="metrics"
              ></app-metric-widget>
              <div class="col-md-4 map" leaflet [leafletOptions]="options">
                <div *ngIf="layer" [leafletLayer]="layer"></div>
              </div>
              <div class="image col-md-4">
                <img src="{{infoData.image}}" alt="" />
              </div>
            </div>
          </mat-tab>
<!--           <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faTemperatureLow"></fa-icon>
              DATI
            </ng-template>
          </mat-tab> -->
          <mat-tab *ngIf="infoData.mac">
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faChartLine"></fa-icon>
              STORICO
            </ng-template>
            <div class="my-3 row inserted">
            <div class="my-3">
              <app-chart class="chart" *ngIf="tableData" [height]="'60vh'" [data]="tableData"></app-chart>
            </div>
            <div class="mb-3">
              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title>
                    Tabella osservazioni
                  </mat-panel-title>
                </mat-expansion-panel-header>
                <app-history-table class="mb-3" *ngIf="tableData" [dataSource]="tableData"></app-history-table>
              </mat-expansion-panel>
            </div>
            </div>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faCircleInfo"></fa-icon>
              INFO STAZIONE
            </ng-template>
            <div class="row inserted">
              <app-station-info [infoData]="infoData"></app-station-info>
            </div>
          </mat-tab>
        </mat-tab-group>

        } @else {
        <app-spinner></app-spinner>
        }
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './station.component.scss'
})
export class StationComponent implements OnInit, OnDestroy {
  metrics!: Metric[];
  options!: any;
  layer!: any;
  time!: any;
  tableData!: any;
  chartData!: any;
  infoData!: any;
  faIgloo = faIgloo;
  faTemperatureLow = faTemperatureLow;
  faChartLine = faChartLine;
  faCircleInfo = faCircleInfo;
  selectedTabIndex!: number;

  deviceId!: any;

  constructor(private service: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTab();
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.getData(this.deviceId);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedTabIndex');
  }

  private getData(id: string): void {
    this.service.getDeviceById(id).subscribe((resp: any) => {
      this.infoData = resp;
    });
    this.getDeviceInfo(id);
    this.getHistoryData(id);
  }

  tabChanged(event: any) {
    this.selectedTabIndex = event;
    localStorage.setItem('selectedTabIndex', event);
  }

  getTab() {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    this.selectedTabIndex = savedTabIndex != null ? parseInt(savedTabIndex, 10) : 0;
  }

  private getDeviceInfo(id:string){
    this.service.getDevicesInfo(id).subscribe((resp: any) => {
      this.time = new Date(resp.weatherData.time);
      this.metrics = resp.weatherData;
      this.initMap(resp.latitude, resp.longitude);
    });
  }

  private getHistoryData(id:string) {
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
    });
  }

  initMap(latitude: number, longitude: number) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: 'MeteoMarso'
        }),
      ],
      zoom: 12,
      center: latLng(latitude, longitude),
    };

    this.layer = circleMarker([latitude, longitude], { radius: 20 });
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 200);
  }

}
