import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TemperatureChartComponent } from '../charts/temperature-chart/temperature-chart.component';
import { RainChartComponent } from '../charts/rain-chart/rain-chart.component';

@Component({
  selector: 'app-station-chart',
  standalone: true,
  imports: [CommonModule, TemperatureChartComponent, RainChartComponent],
  template: `
    <div class="divider my-3">GRAFICI TERMOIGROMETRO</div>
    <div class="row inserted">
      <app-temperature-chart
        [temperatureData]="temperatureData"
        [dewData]="dewData"
      ></app-temperature-chart>
    </div>
    <div class="divider my-3">GRAFICI PLUVIOMETRO</div>
    <div class="row inserted">
      <app-rain-chart
        [rainFall]="rainFallData"
        [rainRate]="rainRateData"
      ></app-rain-chart>
    </div>
    <div class="mb-5"></div>
  `,
  styleUrl: './station-chart.component.scss',
})
export class StationChartComponent implements OnInit {
  @Input() chartData!: any;

  temperatureData: any[] = [];
  dewData: any[] = [];
  rainFallData: any[] = [];
  rainRateData: any[] = [];

  ngOnInit(): void {
    this.chartData.forEach((element: any) => {
      const adjustedTimestamp = new Date(element.time * 1000).getTime();
      this.temperatureData.push([adjustedTimestamp, element.temperature]);
      this.dewData.push([adjustedTimestamp, element.dewPoint]);
      this.rainFallData.push([adjustedTimestamp, element.rainFall]);
      this.rainRateData.push([adjustedTimestamp, element.rainRate]);
    });
  }
}
