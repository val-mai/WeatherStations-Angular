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
import HC_exporting from 'highcharts/modules/exporting';
import * as moment_timezone from "moment-timezone";
(window as any).moment = moment_timezone;

HC_exporting(Highcharts);

@Component({
  selector: 'app-rain-chart',
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
  styleUrl: './rain-chart.component.scss',
})
export class RainChartComponent implements OnChanges {
  @Input() rainFall: any[] = [];
  @Input() rainRate: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};
  render: boolean = false;

  ngOnChanges(): void {
    this.initChart();
  }

  private initChart() {
    this.render = true;
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
            format: '{value} mm',
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
          name: 'Accumulo',
          type: 'spline',
          data: this.rainFall,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' mm',
          },
          zIndex: 1,
        },
        {
          name: 'Intensità',
          data: this.rainRate,
          type: 'line',
          color: '#90ee7e',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' mm/hr',
          },
        },
      ],
    };
  }
}
