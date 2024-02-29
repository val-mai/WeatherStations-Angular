import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { SpinnerComponent } from '../../spinner/spinner.component';

HC_exporting(Highcharts);

@Component({
  selector: 'app-rain-chart',
  standalone: true,
  imports: [
    CommonModule, HighchartsChartModule, SpinnerComponent
  ],
  template: `

  @if(render) {
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 100%; height: {{
        height
      }}; display: block; border-radius: 10px"
    >
    </highcharts-chart>
    } @else {
    <app-spinner></app-spinner>
    }

  `,
  styleUrl: './rain-chart.component.scss'
})

export class RainChartComponent implements OnInit {

  @Input() rainFall: any[] = [];
  @Input() rainRate: any[] = [];
  @Input() height: string = '400px';

  Highcharts = Highcharts;
  chartOptions = {};
  render: boolean = false;

  ngOnInit(): void {
    this.initChart();
  }

  private initChart() {
    this.render = true;
    this.chartOptions = {
      title: {
        text: null,
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
          name: 'Intensità',
          data: this.rainRate,
          type: 'column',
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: ' mm',
          },
        },
        {
          name: 'Accumulo',
          type: 'spline',
          data: this.rainFall,
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

