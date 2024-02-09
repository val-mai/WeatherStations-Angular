import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import windbarb from 'highcharts/modules/windbarb';
import theme from 'highcharts/themes/grid-light';

HC_exporting(Highcharts);
windbarb(Highcharts);
theme(Highcharts);

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

  ngOnInit(): void {
    const temperatureData: any[] = [];
    const pressureData: any[] = [];
    const windData: any[] = [];
    this.data.forEach((element: any, i: number) => {
      const adjustedTimestamp = new Date(element.time * 1000).getTime();
      temperatureData.push([adjustedTimestamp, element.temperature]);
      pressureData.push([adjustedTimestamp, element.pressure]);
      const speed = Math.round((element.windGust * 1000) / 3600);
      if (i % 12 === 0) {
        windData.push([adjustedTimestamp, speed, element.windDirection]);
      }
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
        {
          title: {
            text: '',
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
          data: windData,
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
