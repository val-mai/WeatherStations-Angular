import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-solar-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltipModule],
  template: ` <mat-card class="metric-card">
    <mat-card-header class="pb-3">
      <div class="card-body">
        <img style="width: 60px;" src="../../assets/uv-index.png" alt="" />
        <div class="box">
          <h4>RADIAZIONE SOLARE</h4>
          <div class="data-container">
            <div class="main-data">
              <h5>RADIAZIONE SOLARE</h5>
              <div>
                <mat-card-title class="mx-1">
                  <h3>
                    {{ solarRadiation }}
                  </h3>
                </mat-card-title>
                <mat-card-subtitle>W/mq</mat-card-subtitle>
              </div>
              <div class="sub-data" style="color: red;">
                <h3><b>MAX</b></h3>
                @if (maxRadiation) {
                <p matTooltip="{{ getDate(maxRadiation.time) }}">
                  {{ maxRadiation.value }}
                </p>
                } @else {
                <p>-</p>
                }
              </div>
            </div>
<!--             <div class="main-data">
              <div
                class="arrow"
                [style.transform]="'rotate(' + (windDirection + 180) + 'deg)'"
              >
                <img src="../../assets/direction.png" alt="direction" />
              </div>
              <h4 class="mt-3">{{ getDirection(windDirection) }}</h4>
            </div> -->
            <div class="main-data" *ngIf="!mobile">
              <h5>INDICE UV</h5>
              <div>
                <mat-card-title class="mx-1">
                  <h3>
                    {{ index }}
                  </h3>
                </mat-card-title>
                <mat-card-subtitle></mat-card-subtitle>
              </div>
              <div class="sub-data" style="color: red;">
                <h3><b>MAX</b></h3>
                @if (maxIndex) {
                <p matTooltip="{{ getDate(maxIndex.time) }}">
                  {{ maxIndex.value }}
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
  </mat-card>`,
  styleUrl: './solar-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SolarCardComponent {

  @Input() solarRadiation!: number;
  @Input() index!: number;
  @Input() maxRadiation!: any;
  @Input() maxIndex!: any;

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
