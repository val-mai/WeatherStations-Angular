import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import windbarb from 'highcharts/modules/windbarb';

HC_exporting(Highcharts);
windbarb(Highcharts);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <highcharts-chart
      *ngIf="data"
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: {{
        height
      }}; display: block; border-radius: 10px"
    >
    </highcharts-chart>
  `,
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};

  @Input() title!: string;
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
    const temperatureData: any[] = [];
    const pressureData: any[] = [];
    const windData: any[] = [];
    this.data.forEach((element: any) => {
      const adjustedTimestamp = new Date(element.time * 1000).getTime();
      temperatureData.push([adjustedTimestamp, element.temperature]);
      pressureData.push([adjustedTimestamp, element.pressure]);
      const speed = Math.round((element.windGust * 1000) / 3600);
      windData.push([adjustedTimestamp, speed, element.windDirection]);
    });
    this.chartOptions = {
      title: {
        text: this.title,
      },
      chart: {
        alignThresholds: true,
        plotShadow: true,
      },
      xAxis: {
        type: 'datetime',
        offset: 40,
        gapGridLineWidth: 0,
      },
      yAxis: [
        {
          title: {
            text: 'Temperatura',
          },
        },
        {
          title: {
            text: 'Pressione',
          },
          labels: {
            format: '{value} hPa',
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
          name: 'Temperatura',
          data: temperatureData,
          type: 'area',
          yAxis: 0,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' °C',
          },
        },
        {
          name: 'Pressione',
          type: 'spline',
          yAxis: 1,
          data: pressureData,
          marker: {
            enabled: false,
          },
          dashStyle: 'shortdot',
          tooltip: {
            valueSuffix: ' hPa',
          },
        },
        {
          name: 'Vento',
          data: this.filterData(windData, 24),
          type: 'windbarb',
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
