import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-pressure-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/barometer.png" alt="" />
          <div class="box">
            <h4>PRESSIONE</h4>
            <div class="data-container">
              <div class="main-data">
                <h5>RELATIVA</h5>
                <div>
                  <mat-card-title class="mx-1">
                    <h3>
                      {{ relative }}
                    </h3>
                  </mat-card-title>
                  <mat-card-subtitle>hPa</mat-card-subtitle>
                </div>
                <div class="sub-data">
                  <div style="color: blue;">
                    <h3><b>MIN</b></h3>
                    @if (min) {
                    <p matTooltip="{{ getDate(min.time) }}">
                      {{ min.value }} hPa
                    </p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                  <div style="color: red;">
                    <h3><b>MAX</b></h3>
                    @if (max) {
                    <p matTooltip="{{ getDate(max.time) }}">
                      {{ max.value }} hPa
                    </p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                </div>
              </div>
              <div class="main-data" *ngIf="!mobile">
                <h5>ASSOLUTA</h5>
                <div>
                  <mat-card-title class="mx-1">
                    <h3>
                      {{ absolute }}
                    </h3>
                  </mat-card-title>
                  <mat-card-subtitle>hPa</mat-card-subtitle>
                </div>
                <div class="sub-data">
                  <div style="color: blue;">
                    <h3><b>MIN</b></h3>
                    @if (min) {
                    <p matTooltip="{{ getDate(min.time) }}">
                      {{ min.value }} hPa
                    </p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                  <div style="color: red;">
                    <h3><b>MAX</b></h3>
                    @if (max) {
                    <p matTooltip="{{ getDate(max.time) }}">
                      {{ max.value }} hPa
                    </p>
                    } @else {
                    <p>-</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './pressure-card.component.scss',
})
export class PressureCardComponent {
  @Input() absolute!: number;
  @Input() relative!: number;
  @Input() max!: any;
  @Input() min!: any;

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
}
