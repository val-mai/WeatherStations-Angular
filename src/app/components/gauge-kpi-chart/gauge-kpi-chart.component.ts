import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import gauge from 'highcharts/modules/solid-gauge';
import more from 'highcharts/highcharts-more';

more(Highcharts);
gauge(Highcharts);

@Component({
  selector: 'app-gauge-kpi-chart',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `
    <highcharts-chart
      [Highcharts]="Highcharts"
      [options]="chartOptions"
      style="width: 200px; height: {{
        height
      }}; display: block"
    >
    </highcharts-chart>
  `,
  styleUrl: './gauge-kpi-chart.component.scss',
})
export class GaugeKpiChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};
  @Input() height: string = '140px';
  @Input() data: any;

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'solidgauge',
      },
      title: {
        text: null,
      },
      pane: {
        center: ['50%', '85%'],
        size: '120%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      exporting: {
        enabled: false,
      },
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'], // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          text: "Intensità",
          y: -50,
        },
        labels: {
          y: 16,
        },
        min: 0,
        max: 20,
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        enabled: false,
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true,
          },
        },
      },
      series: [
        {
          name: 'Intensità',
          data: [this.data],
          dataLabels: {
            format:
              '<div style="text-align:center">' +
              '<span style="font-size:25px">{y}</span><br/>' +
              '<span style="font-size:12px;opacity:0.4">mm/hr</span>' +
              '</div>',
          },
          tooltip: {
            valueSuffix: ' mm/hr',
          },
        },
      ],
    };
  }
}
