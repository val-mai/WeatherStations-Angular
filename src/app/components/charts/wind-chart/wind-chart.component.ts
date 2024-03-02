import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import windbarb from 'highcharts/modules/windbarb';

windbarb(Highcharts);

@Component({
  selector: 'app-wind-chart',
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
  styleUrl: './wind-chart.component.scss',
})
export class WindChartComponent implements OnInit {
  @Input() windSpeed: any[] = [];
  @Input() windGust: any[] = [];
  @Input() windBarb: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};

  filterData(data: number[], numberOfPointsToShow: number) {
    const step = Math.ceil(data.length / numberOfPointsToShow);
    const filteredData = [];
    for (let i = 0; i < data.length; i += step) {
      filteredData.push(data[i]);
    }
    return filteredData;
  }

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
            format: '{value} km/h',
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
          name: 'Velocità',
          data: this.windSpeed,
          type: 'area',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' km/h',
          },
        },
        {
          name: 'Raffica',
          type: 'scatter',
          color: 'orange',
          data: this.windGust,
          tooltip: {
            valueSuffix: ' km/h',
          },
        },
        {
          name: 'Vento',
          type: 'windbarb',
          color: '#90ee7e',
          data: this.filterData(this.windBarb, 12),
          tooltip: {
            valueSuffix: ' m/s',
          },
        },
      ],
    };
  }
}
