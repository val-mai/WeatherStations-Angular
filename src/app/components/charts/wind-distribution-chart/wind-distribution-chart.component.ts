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

@Component({
  selector: 'app-wind-distribution-chart',
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
  styleUrl: './wind-distribution-chart.component.scss',
})
export class WindDistributionChartComponent implements OnChanges {
  @Input() windDistribution: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};

  ngOnChanges(): void {
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
