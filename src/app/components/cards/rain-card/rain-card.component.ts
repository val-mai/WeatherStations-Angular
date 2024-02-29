import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GaugeKpiChartComponent } from '../../gauge-kpi-chart/gauge-kpi-chart.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-rain-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTooltipModule,
    GaugeKpiChartComponent,
  ],
  template: `
    <mat-card class="metric-card" [ngClass]="{ mobile: mobile == true }">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/heavy-rain.png" alt="" />
          <div class="box">
            <h4>PIOGGIA ODIERNA</h4>
            <div class="main-data row">
              <div class="main-data mx-5 col-md">
                <mat-card-title class="mx-1">
                  <h3>
                    {{ rainFall }}
                  </h3>
                </mat-card-title>
                <mat-card-subtitle>mm</mat-card-subtitle>
              </div>
              <div class="main-data col-md">
                <app-gauge-kpi-chart [data]="rainRate"></app-gauge-kpi-chart>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './rain-card.component.scss',
})
export class RainCardComponent implements OnInit, AfterViewInit {
  @Input() rainFall: any;
  @Input() rainRate?: any;

  mobile!: boolean;

  constructor(private responsive: BreakpointObserver) {}

  ngOnInit(): void {
    this.rainFall = this.rainFall != undefined ? this.rainFall : '-';
    this.rainRate = this.rainRate != undefined ? this.rainRate : '-';
  }

  ngAfterViewInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
      });
  }
}
