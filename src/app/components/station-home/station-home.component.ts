import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { GeneralChartComponent } from '../general-chart/general-chart.component';
import { MetricWidgetComponent } from '../metric-widget/metric-widget.component';

@Component({
  selector: 'app-station-home',
  standalone: true,
  imports: [CommonModule, MetricWidgetComponent, LeafletModule, GeneralChartComponent],
  template: `
    <div class="divider my-3">PANORAMICA</div>
    <div *ngIf="metrics && infoData" class="row inserted half-h">
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
    <div class="divider my-3">GRAFICO GENERALE</div>
    <div class="row inserted">
      <app-chart
        class="chart my-3"
        *ngIf="tableData"
        [height]="'60vh'"
        [data]="tableData"
      ></app-chart>
    </div>
    @if (webcam) {
    <div class="divider my-3">WEBCAM</div>
    <div class="inserted row">
      <img class="webcam" src="{{ webcam }}" />
    </div>
    }
    <div class="mb-5"></div>
  `,
  styleUrl: './station-home.component.scss',
})
export class StationHomeComponent implements OnInit {
  @Input() metrics!: any;
  @Input() infoData!: any;
  @Input() tableData!: any;

  options!: any;
  layer!: any;
  webcam!: any;

  ngOnInit(): void {
    this.initMap(this.infoData.latitude, this.infoData.longitude);
    this.initWebcam();
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

  initWebcam() {
    this.webcam = null;
    if (this.infoData.webcam.page != null) {
      this.webcam = this.infoData.webcam.page;
      setTimeout(() => {
        this.webcam = null;
        let date = Date.now();
        this.webcam = this.infoData.webcam.url + '?' + date;
      }, 2000);
    }
  }
}
