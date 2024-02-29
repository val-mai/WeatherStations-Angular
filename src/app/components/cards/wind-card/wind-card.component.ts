import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-wind-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/windsock.png" alt="" />
          <div class="box">
            <h4>VENTO</h4>
            <div class="data-container">
              <div class="main-data">
                <h5>RAFFICA</h5>
                <div>
                  <mat-card-title class="mx-1">
                    <h3>
                      {{ windGust }}
                    </h3>
                  </mat-card-title>
                  <mat-card-subtitle>km/h</mat-card-subtitle>
                </div>
                <div class="sub-data" style="color: red;">
                  <h3><b>MAX</b></h3>
                  @if (maxGust) {
                  <p matTooltip="{{ getDate(maxGust.time) }}">
                    {{ maxGust.value }} km/h
                  </p>
                  } @else {
                  <p>-</p>
                  }
                </div>
              </div>
              <div class="main-data">
                <div
                  class="arrow"
                  [style.transform]="'rotate(' + windDirection + 'deg)'"
                >
                  <img src="../../assets/direction.png" alt="direction" />
                </div>
                <h4>{{ getDirection(windDirection) }}</h4>
              </div>
              <div class="main-data" *ngIf="!mobile">
                <h5>VELOCITA'</h5>
                <div>
                  <mat-card-title class="mx-1">
                    <h3>
                      {{ windSpeed }}
                    </h3>
                  </mat-card-title>
                  <mat-card-subtitle>km/h</mat-card-subtitle>
                </div>
                <div class="sub-data" style="color: red;">
                  <h3><b>MAX</b></h3>
                  @if (maxSpeed) {
                  <p matTooltip="{{ getDate(maxSpeed.time) }}">
                    {{ maxSpeed.value }} km/h
                  </p>
                  } @else {
                  <p>-</p>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './wind-card.component.scss',
})
export class WindCardComponent implements AfterViewInit {
  @Input() windDirection!: number;
  @Input() windSpeed!: number;
  @Input() windGust!: number;
  @Input() maxGust: any;
  @Input() maxSpeed: any;

  mobile: boolean = false;

  constructor(private responsive: BreakpointObserver) {}

  ngAfterViewInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
      });
  }

  getDate(timestamp: number): string {
    if (timestamp == null) {
      return '';
    }
    const date = new Date(timestamp * 1000).toLocaleString();
    return date;
  }

  getDirection(direction: number) {
    var val = Math.floor(direction / 22.5 + 0.5);
    var arr = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    return arr[val % 16];
  }
}
