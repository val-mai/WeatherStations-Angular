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
  selector: 'app-wind-distribution-chart',
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
  styleUrl: './wind-distribution-chart.component.scss',
})
export class WindDistributionChartComponent implements OnInit {
  @Input() windDistribution: any[] = [];
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
        plotShadow: true,
        polar: true,
      },
      xAxis: {
        categories: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
      },
      yAxis: {
        min: 0,
      },
      plotOptions: {
        series: {
          shadow: false,
          groupPadding: 0,
          pointPlacement: 'on',
        },
      },
      credits: {
        text: 'MeteoMarso',
      },
      accessibility: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        format: '{series.xAxis.categories.(point.x)}: <b>{point.y:.2f}%<b>',
      },
      series: [
        {
          type: 'column',
          name: 'Direzione',
          data: this.windDistribution,
        },
      ],
    };
  }
}
