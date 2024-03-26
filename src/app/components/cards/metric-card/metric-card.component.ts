import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Metric } from 'src/app/interfaces/metric';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, FontAwesomeModule, MatTooltipModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/temperature.png" alt="" />
          <div class="box">
            <h4>TEMPERATURA</h4>
            <div class="row">
              <div class="col column">
                <div class="main-data">
                  <mat-card-title class="mx-1">
                    <h3 style="color: {{ this.color }}">
                      {{ temperature }}
                    </h3>
                  </mat-card-title>
                  <mat-card-subtitle>°C</mat-card-subtitle>
                </div>
                <div class="sub-data">
                  <div style="color: blue;">
                    <h3><b>MIN</b></h3>
                    @if (min) {
                    <p matTooltip="{{ getDate(min.time) }}">{{ min.value }}</p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                  <div style="color: red;">
                    <h3><b>MAX</b></h3>
                    @if (max) {
                    <p matTooltip="{{ getDate(max.time) }}">{{ max.value }}</p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                </div>
              </div>
              <div class="col column" *ngIf="!mobile">
                <p>
                  <mat-card-subtitle
                    >Percepita: {{ feelsLike }} °C</mat-card-subtitle
                  >
                </p>
                <p>
                  <mat-card-subtitle
                    >Rugiada: {{ dewPoint }} °C</mat-card-subtitle
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './metric-card.component.scss',
})
export class MetricCardComponent implements OnInit {
  @Input() metric!: Metric;

  color!: string;
  @Input() temperature: number = 35;
  @Input() feelsLike: number = 35;
  @Input() dewPoint: number = 35;
  @Input() min: any;
  @Input() max: any;

  mobile: boolean = false;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.getColor();
  }

  ngAfterViewInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
      });
  }

  getColor() {
    const normalizedTemperature = (this.temperature + 10) / 50;
    const hue = (1 - normalizedTemperature) * 240;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  getDate(timestamp: number): string {
    if (timestamp == null) {
      return '';
    }
    const date = new Date(timestamp * 1000).toLocaleString();
    return date;
  }
}
