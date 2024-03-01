import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IWindDistribution } from 'src/app/interfaces/IWindDistribution';
import { FeelsLikeChartComponent } from '../charts/feels-like-chart/feels-like-chart.component';
import { HumidityChartComponent } from '../charts/humidity-chart/humidity-chart.component';
import { RainChartComponent } from '../charts/rain-chart/rain-chart.component';
import { TemperatureChartComponent } from '../charts/temperature-chart/temperature-chart.component';
import { WindDistributionChartComponent } from '../charts/wind-distribution-chart/wind-distribution-chart.component';

@Component({
  selector: 'app-station-chart',
  standalone: true,
  imports: [
    CommonModule,
    TemperatureChartComponent,
    RainChartComponent,
    HumidityChartComponent,
    FeelsLikeChartComponent,
    WindDistributionChartComponent,
  ],
  template: `
    <div class="divider my-3">GRAFICI TERMOIGROMETRO</div>
    <div class="row inserted">
      <app-temperature-chart
        [temperatureData]="temperatureData"
        [dewData]="dewData"
      ></app-temperature-chart>
    </div>
    <div class="row my-3 inserted">
      <div class="col-md-6">
        <app-humidity-chart [humidityData]="humidityData"></app-humidity-chart>
      </div>
      <div class="col-md-6">
        <app-feels-like-chart
          [feelsLike]="feelsLikeData"
        ></app-feels-like-chart>
      </div>
    </div>
    <div class="divider my-3">GRAFICO PLUVIOMETRO</div>
    <div class="row inserted">
      <app-rain-chart
        [rainFall]="rainFallData"
        [rainRate]="rainRateData"
      ></app-rain-chart>
    </div>
    <div class="divider my-3">GRAFICI ANEMOMETRO</div>
    <div class="row inserted">
      <app-wind-distribution-chart
        [windDistribution]="windDistributionData"
      ></app-wind-distribution-chart>
    </div>
    <div class="mb-5"></div>
  `,
  styleUrl: './station-chart.component.scss',
})
export class StationChartComponent implements OnInit {
  @Input() chartData!: any;
  @Input() windRose!: IWindDistribution;

  temperatureData: any[] = [];
  humidityData: any[] = [];
  dewData: any[] = [];
  feelsLikeData: any[] = [];
  rainFallData: any[] = [];
  rainRateData: any[] = [];
  windDistributionData: any[] = [];

  ngOnInit(): void {
    this.chartData.forEach((element: any) => {
      const adjustedTimestamp = new Date(element.time * 1000).getTime();
      this.temperatureData.push([adjustedTimestamp, element.temperature]);
      this.dewData.push([adjustedTimestamp, element.dewPoint]);
      this.feelsLikeData.push([adjustedTimestamp, element.feelsLike]);
      this.rainFallData.push([adjustedTimestamp, element.rainFall]);
      this.rainRateData.push([adjustedTimestamp, element.rainRate]);
      this.humidityData.push([adjustedTimestamp, element.humidity]);
    });
    this.createDistribution();
    console.log(this.windDistributionData);
  }

  private createDistribution() {
    this.windDistributionData.push(this.windRose.N);
    this.windDistributionData.push(this.windRose.NE);
    this.windDistributionData.push(this.windRose.E);
    this.windDistributionData.push(this.windRose.SE);
    this.windDistributionData.push(this.windRose.S);
    this.windDistributionData.push(this.windRose.SW);
    this.windDistributionData.push(this.windRose.W);
    this.windDistributionData.push(this.windRose.NW);
  }

  /*
  --highcharts-color-0: #7cb5ec;
  --highcharts-color-1: #f7a35c;
  --highcharts-color-2: #90ee7e;
  --highcharts-color-3: #7798bf;
  --highcharts-color-4: #aaeeee;
  --highcharts-color-5: #ff0066;
  --highcharts-color-6: #eeaaee;
  --highcharts-color-7: #55bf3b;
  --highcharts-color-8: #df5353;
  --highcharts-color-9: #7798bf;
  */
}
