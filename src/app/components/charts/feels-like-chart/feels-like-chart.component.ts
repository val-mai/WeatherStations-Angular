import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-feels-like-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: {{
        height
      }}; display: block; border-radius: 10px"
    >
    </highcharts-chart>
  `,
  styleUrl: './feels-like-chart.component.scss',
})
export class FeelsLikeChartComponent implements OnInit {
  @Input() feelsLike: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};

  ngOnInit(): void {
    this.initChart();
  }

  private initChart() {
    this.chartOptions = {
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
          color: '#00897b',
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
