import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';

HC_exporting(Highcharts);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule, HighchartsChartModule
  ],
  template: `
  
  <highcharts-chart
  *ngIf="data"
  [Highcharts]="Highcharts"
  [options]="chartOptions"

  style="width: 100%; height: {{height}}; display: block; border-radius: 10px">
  </highcharts-chart>
  
  `,
  styleUrl: './chart.component.scss'
})
export class ChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};

  @Input() data = [];
  @Input() height: string = "400px";

  ngOnInit(): void {
    const temperatureData: any[] = [];
    const windData: any[] = [];
    const pressureData: any[] = [];
    const timeZoneOffset = 60;
    this.data.forEach((element: any) => {
      const adjustedTimestamp = new Date(element.time).getTime() + (timeZoneOffset * 60000);
      temperatureData.push([adjustedTimestamp, element.temperature]);
      windData.push([adjustedTimestamp, element.windSpeed]);
      pressureData.push([adjustedTimestamp, element.pressure]);
    });
    this.chartOptions = {
      title: {
        text: "Ultime 24h"
      },
      chart: {
        alignThresholds: true,
        plotShadow: true
      },
      xAxis: {
        type: 'datetime',
        gapGridLineWidth: 0
      },
      yAxis: [
        {
          title: {
            text: 'Temperatura'
          }
        }, 
        {
          title: {
            text: 'Pressione',
          },
          labels: {
            format: '{value} hPa',
          },
          opposite: true
        },
        {
          title: {
            text: 'Velocità del vento'
          },
          labels: {
            format: '{value} km/h',
          },
          opposite: true
        }
      ],
      credits: {
        text: "MeteoMarso",
      },
      accessibility: {
        enabled: false,
      },
      tooltip: {
        shared: true
      },
      series: [
        {
          name: "Temperatura",
          data: temperatureData,
          type: 'area',
          yAxis: 0,
          marker: {
            enabled: false
          },
          tooltip: {
            valueSuffix: ' °C'
          }
        },
        {
          name: "Vento",
          data: windData,
          type: 'column',
          yAxis: 2,
          tooltip: {
            valueSuffix: ' km/h'
          }
        },
        {
          name: 'Pressione',
          type: 'spline',
          yAxis: 1,
          data: pressureData,
          marker: {
            enabled: false
          },
          dashStyle: 'shortdot',
          tooltip: {
            valueSuffix: ' hPa'
          }
        }
      ],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            yAxis: {
              title: {
                text: ''
              }
            }
          }
        }]
      }
    }
  };

}
