import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, type OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
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
import { HumidityCardComponent } from 'src/app/components/cards/humidity-card/humidity-card.component';
import { MetricCardComponent } from 'src/app/components/cards/metric-card/metric-card.component';
import { RainCardComponent } from 'src/app/components/cards/rain-card/rain-card.component';
import { RainLevelsCardComponent } from 'src/app/components/cards/rain-levels-card/rain-levels-card.component';
import { VariousCardComponent } from 'src/app/components/cards/various-card/various-card.component';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HistoryTableComponent } from 'src/app/components/history-table/history-table.component';
import { MetricWidgetComponent } from 'src/app/components/metric-widget/metric-widget.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { StationInfoComponent } from 'src/app/components/station-info/station-info.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { WindChartComponent } from 'src/app/components/wind-chart/wind-chart.component';
import { DataService } from 'src/app/services/data.service';
import { DeviceService } from 'src/app/services/device.service';

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
    MatExpansionModule,
    WindChartComponent,
    MetricCardComponent,
    VariousCardComponent,
    HumidityCardComponent,
    RainCardComponent,
    RainLevelsCardComponent
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container mt-4">
        <h2 *ngIf="infoData">{{ infoData.name }}</h2>
        @if (options) {
        <p *ngIf="metrics">
          Ultimo aggiornamento:
          {{ time | date : "MMM dd, yyyy 'alle' HH:mm:ss" }}
        </p>
        <mat-tab-group
          color="accent"
          [selectedIndex]="selectedTabIndex"
          (selectedIndexChange)="tabChanged($event)"
        >
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faIgloo"></fa-icon>
              HOME
            </ng-template>
            <div class="row inserted half-h mt-2 mb-4 g-2">
              <app-metric-widget
                class="col-md-4"
                [metric]="metrics"
              ></app-metric-widget>
              <div class="col-md-4 map" leaflet [leafletOptions]="options">
                <div *ngIf="layer" [leafletLayer]="layer"></div>
              </div>
              <div class="image col-md-4">
                <img src="{{ infoData.image }}" alt="" />
              </div>
            </div>
            <div class="divider">GRAFICO GENERALE</div>
            <div class="row inserted mt-2 mb-2 g-2">
              <app-chart
                [title]="chartTitle"
                [deviceId]="deviceId"
                class="chart my-3"
                *ngIf="tableData"
                [height]="'60vh'"
                [data]="tableData"
              ></app-chart>
            </div>
            <div class="divider">WEBCAM</div>
            @if (infoData.webcam) {
            <img class="webcam mt-2 mb-4" src="{{ infoData.webcam }}" alt="" />
            } @else {
            <p class="mt-2 mb-4">Disponibile a breve</p>
            }
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faTemperatureLow"></fa-icon>
              DATI COMPLETI
            </ng-template>
            <div class="divider mt-2">DATI TERMOIGROMETRO</div>
            <div class="row inserted mt-2 mb-2 g-2">
              <div class="col-md-4 my-2">
                <app-metric-card
                  [temperature]="metrics?.temperature.value"
                  [min]="min?.temperature"
                  [max]="max?.temperature"
                >
                </app-metric-card>
              </div>
              <div class="col-md-4 my-2">
                <app-humidity-card
                  [humidity]="metrics?.humidity.value"
                  [min]="min?.humidity"
                  [max]="max?.humidity"
                >
                </app-humidity-card>
              </div>
              <div class="col-md-4 my-2">
                <app-various-card
                  [dewPoint]="metrics?.dewPoint?.value"
                  [feelsLike]="metrics?.feelsLike?.value"
                >
                </app-various-card>
              </div>
            </div>
            <div class="divider mt-2">DATI PLUVIOMETRO</div>
            <div class="row inserted mt-2 mb-2 g-2">
              <div class="col-md-6 my-2">
                <app-rain-card
                  [rainFall]="metrics?.rainFall?.value"
                  [rainRate]="metrics?.rainRate?.value"
                ></app-rain-card>
              </div>
              <div class="col-md-6 my-2">
                <app-rain-levels-card [event]="metrics?.rainEvent?.value"
                [hourly]="metrics?.rainHour?.value"
                [weekly]="metrics?.rainWeek?.value"
                [monthly]="metrics?.rainMonth?.value"
                [yearly]="metrics?.rainYear?.value"
                ></app-rain-levels-card>
              </div>
            </div>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faChartLine"></fa-icon>
              STORICO
            </ng-template>
            <div class="my-3 row inserted">
              <div>
                <app-chart
                  [title]="chartTitle"
                  [deviceId]="deviceId"
                  class="chart my-3"
                  *ngIf="tableData"
                  [height]="'60vh'"
                  [data]="tableData"
                ></app-chart>
                <!--                 <app-wind-chart
                  *ngIf="tableData"
                  [height]="'60vh'"
                  [data]="tableData"
                >
                </app-wind-chart> -->
              </div>
              <div class="mb-3">
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title> Tabella osservazioni </mat-panel-title>
                  </mat-expansion-panel-header>
                  <app-history-table
                    class="mb-3"
                    *ngIf="tableData"
                    [dataSource]="tableData"
                  ></app-history-table>
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
  styleUrl: './station.component.scss',
})
export class StationComponent implements OnInit, OnDestroy, AfterViewInit {
  metrics!: any;
  min!: any;
  max!: any;
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
  chartTitle!: string;

  constructor(
    private deviceService: DeviceService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTab();
    this.deviceId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.getData(this.deviceId);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedTabIndex');
  }

  private getData(id: string): void {
    this.deviceService.getDeviceById(id).subscribe((resp: any) => {
      this.infoData = resp;
      this.getDeviceInfo(id);
      this.getHistoryData(id);
      this.chartTitle = this.infoData.mac ? 'Ultime 24h' : 'Oggi';
    });
  }

  tabChanged(event: any) {
    this.selectedTabIndex = event;
    localStorage.setItem('selectedTabIndex', event);
  }

  getTab() {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    this.selectedTabIndex =
      savedTabIndex != null ? parseInt(savedTabIndex, 10) : 0;
  }

  private getDeviceInfo(id: string) {
    this.dataService.getRealtimeData(id).subscribe((resp: any) => {
      this.time = new Date(resp.time * 1000);
      this.metrics = resp;
      this.initMap(this.infoData.latitude, this.infoData.longitude);
    });
  }

  private getHistoryData(id: string) {
    this.dataService.getDailyHistory(id).subscribe((data: any) => {
      this.tableData = data.observations;
      this.min = data.min;
      this.max = data.max;
    });
  }

  initMap(latitude: number, longitude: number) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 15,
          attribution: 'MeteoMarso',
        }),
      ],
      zoom: 12,
      center: latLng(latitude, longitude),
    };

    this.layer = circleMarker([latitude, longitude], { radius: 20 });
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }
}
