import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as moment_timezone from "moment-timezone";
(window as any).moment = moment_timezone;

@Component({
  selector: 'app-temperature-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-content>
        <highcharts-chart
          [Highcharts]="Highcharts"
          [options]="chartOptions"
          style="width: 100%; height: {{ height }}; display: block;"
        >
        </highcharts-chart>
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './temperature-chart.component.scss',
})
export class TemperatureChartComponent implements OnChanges {
  @Input() temperatureData: any[] = [];
  @Input() dewData: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};

  ngOnChanges(): void {
    this.initChart();
  }

  private initChart() {
    this.chartOptions = {
      time: {
        timezone: 'Europe/Rome',
        useUTC: false
      },
      title: {
        text: null,
      },
      chart: {
        alignThresholds: true,
        plotShadow: true,
        zoomType: 'x',
      },
      xAxis: {
        type: 'datetime',
        offset: 40,
        gapGridLineWidth: 0,
      },
      yAxis: [
        {
          title: {
            text: null,
          },
          labels: {
            format: '{value}°',
            style: {
              fontSize: '10px',
            },
            x: -3,
          },
        },
      ],
      credits: {
        text: 'MeteoMarso',
      },
      export: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          name: 'Temperatura',
          data: this.temperatureData,
          type: 'area',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
          tooltip: {
            pointFormat:
              '<span style="color:{point.color}">\u25CF</span> ' +
              '{series.name}: <b>{point.y}°C</b><br/>',
          },
          color: '#48AFE8',
        },
        {
          name: 'Temp. rugiada',
          type: 'spline',
          data: this.dewData,
          color: '#90ee7e',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' °C',
          },
        },
      ],
    };
  }
}
