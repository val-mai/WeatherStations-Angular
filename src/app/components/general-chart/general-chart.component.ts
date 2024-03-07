import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_exporting from 'highcharts/modules/exporting';
import windbarb from 'highcharts/modules/windbarb';
import { DataService } from 'src/app/services/data.service';
import { SpinnerComponent } from '../spinner/spinner.component';

HC_exporting(Highcharts);
windbarb(Highcharts);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SpinnerComponent,
  ],
  template: `
    <!--  <mat-form-field>
      <mat-label>Enter a date range</mat-label>
      <mat-date-range-input [formGroup]="range" [rangePicker]="picker">
        <input matStartDate formControlName="start" placeholder="Start date" />
        <input
          matEndDate
          formControlName="end"
          placeholder="End date"
          (dateChange)="selectRange()"
        />
      </mat-date-range-input>
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-date-range-picker #picker></mat-date-range-picker>
    </mat-form-field> -->
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
  styleUrl: './general-chart.component.scss',
})
export class GeneralChartComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};
  render: boolean = true;

  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() height: string = '400px';
  /* @Input() deviceId!: string; */

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  temperatureData: any[] = [];
  pressureData: any[] = [];
  windData: any[] = [];

  constructor(private dataService: DataService) {}

  /* selectRange() {
    this.render = false;
    const startDateControl = this.range.get('start');
    const startDate = new Date(startDateControl?.value).toISOString();
    const endDateControl = this.range.get('end');
    const endDate = new Date(endDateControl?.value).toISOString();
    this.dataService
      .getHistory(this.deviceId, startDate, endDate)
      .subscribe((data: any) => {
        this.title =
          this.range.value.start.toLocaleDateString() +
          ' - ' +
          this.range.value.end.toLocaleDateString();
        this.temperatureData = [];
        this.pressureData = [];
        this.windData = [];
        this.initChart(data.observations);
      });
  } */

  filterData(data: number[], numberOfPointsToShow: number) {
    const step = Math.ceil(data.length / numberOfPointsToShow);
    const filteredData = [];
    for (let i = 0; i < data.length; i += step) {
      filteredData.push(data[i]);
    }
    return filteredData;
  }

  ngOnInit(): void {
    this.initChart(this.data);
  }

  private initChart(weatherData: any[]) {
    weatherData.forEach((element: any, i: number) => {
      const adjustedTimestamp = new Date(element.time * 1000).getTime();
      this.temperatureData.push([adjustedTimestamp, element.temperature]);
      this.pressureData.push([adjustedTimestamp, element.pressure]);
      const speed = Math.round((element.windGust * 1000) / 3600);
      this.windData.push([adjustedTimestamp, speed, element.windDirection]);
    });
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
            format: '{value}°',
            style: {
              fontSize: '10px',
            },
            x: -3,
          },
        },
        {
          title: {
            text: null,
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
          data: this.temperatureData,
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
          data: this.pressureData,
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
          data: this.filterData(this.windData, 24),
          type: 'windbarb',
          tooltip: {
            valueSuffix: ' m/s',
          },
        },
      ]
    };
  }
}
