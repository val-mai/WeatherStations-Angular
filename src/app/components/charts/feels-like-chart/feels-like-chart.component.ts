import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as moment_timezone from "moment-timezone";
(window as any).moment = moment_timezone;

@Component({
  selector: 'app-feels-like-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HighchartsChartModule, MatCardModule],
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
  styleUrl: './feels-like-chart.component.scss',
})
export class FeelsLikeChartComponent implements OnChanges {
  @Input() feelsLike: any[] = [];
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
            format: '{value} °C',
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
      accessibility: {
        enabled: false,
      },
      tooltip: {
        shared: true,
      },
      series: [
        {
          name: 'Temp. percepita',
          type: 'spline',
          data: this.feelsLike,
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
