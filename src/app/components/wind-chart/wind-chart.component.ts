import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import windbarb from 'highcharts/modules/windbarb';
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts);
windbarb(Highcharts);

@Component({
  selector: 'app-wind-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: ` <highcharts-chart
    *ngIf="data"
    [Highcharts]="Highcharts"
    [options]="chartOptions"
    style="width: 100%; height: {{
      height
    }}; display: block; border-radius: 10px"
  >
  </highcharts-chart>`,
  styleUrl: './wind-chart.component.scss',
})
export class WindChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};

  @Input() data = [];
  @Input() height: string = '400px';

  filterData(data: number[], numberOfPointsToShow: number) {
    const step = Math.ceil(data.length / numberOfPointsToShow);
    const filteredData = [];
    for (let i = 0; i < data.length; i += step) {
      filteredData.push(data[i]);
    }

    return filteredData;
  }

  ngOnInit(): void {
    const windSpeed: any[] = [];
    const windDirection: any[] = [];
    const timeZoneOffset = 60;
    this.data.forEach((element: any) => {
      const adjustedTimestamp =
        new Date(element.time).getTime() + timeZoneOffset * 60000;
      windSpeed.push([adjustedTimestamp, element.windSpeed]);
      const speed = Math.round((element.windSpeed * 1000) / 3600);
      windDirection.push([adjustedTimestamp, speed, element.windDirection]);
    });
    this.chartOptions = {
      title: {
        text: 'Vento',
      },
      xAxis: {
        type: 'datetime',
        offset: 40,
      },
      yAxis: [
        {
          title: {
            text: 'Velocità del vento',
          },
          labels: {
            format: '{value} km/h',
          },
        },
      ],
      credits: {
        text: 'MeteoMarso',
      },
      accessibility: {
        enabled: false,
      },
      series: [
        {
          name: 'Velocità',
          data: windSpeed,
          type: 'spline',
          tooltip: {
            valueSuffix: ' km/h',
          },
        },
        {
          name: 'Vento',
          data: this.filterData(windDirection, 24),
          type: 'windbarb',
          showInLegend: false,
          tooltip: {
            valueSuffix: ' m/s',
          },
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              yAxis: {
                title: {
                  text: '',
                },
              },
            },
          },
        ],
      },
    };
  }
}
