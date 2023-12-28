import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

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

  style="width: 100%; height: 400px; display: block; border-radius: 10px"
></highcharts-chart>
  
  `,
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnInit {
  
  ngOnInit(): void {
    console.log(this.data);
    const time: any[] = [];
    const temp: any[] = [];
    this.data.forEach((element:any) => {
     temp.push(element.temperature);
     time.push(element.time)
    });

    console.log(temp)
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: '#222' // Colore di sfondo desiderato
      },
      xAxis: {
        categories: time,
        labels: {
          enabled: false // Nasconde i valori sull'asse x
        }
      },
      series: [{
        data: temp,
        type: 'area'
      }]
    };
  }
  
  Highcharts = Highcharts;

  chartOptions = {};

  @Input() data = [];

 }
