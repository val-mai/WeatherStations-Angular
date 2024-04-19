import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import * as moment_timezone from 'moment-timezone';
(window as any).moment = moment_timezone;

@Component({
  selector: 'app-radiation-chart',
  standalone: true,
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
  styleUrl: './radiation-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadiationChartComponent {
  @Input() solarRadiationData: any[] = [];
  @Input() uvIndexData: any[] = [];
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
        useUTC: false,
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
            format: '{value} W/mq',
            style: {
              fontSize: '10px',
            },
            x: -3,
          },
        },
        {
          title: {
            text: null,
          },
          labels: {
            enabled: false,
          },
          opposite: true,
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
          name: 'Radiazione Solare',
          type: 'area',
          data: this.solarRadiationData,
          yAxis: 0,
          color: '#FFCB47',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' W/mq',
          },
        },
        {
          name: 'Indice UV',
          type: 'line',
          data: this.uvIndexData,
          yAxis: 1,
          color: '#E4572E',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: '',
          },
          dashStyle: 'shortdot',
        },
      ],
    };
  }
}
