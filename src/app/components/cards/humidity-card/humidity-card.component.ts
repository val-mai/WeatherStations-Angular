import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-humidity-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/humidity.png" alt="" />
          <!-- <fa-icon [icon]="faTemperature" size="5x"></fa-icon> -->
          <div class="box">
            <h4>UMIDITA'</h4>
            <div class="main-data">
              <mat-card-title class="mx-1">
                <h3>
                  {{ humidity }}
                </h3>
              </mat-card-title>
              <mat-card-subtitle>%</mat-card-subtitle>
            </div>
            <div class="sub-data">
              <div style="color: blue;">
                <h3><b>MIN</b></h3>
                @if (min) {
                <p>{{ min.value }} %</p>
                } @else {
                <p>-</p>
                }
              </div>
              <div style="color: red;">
                <h3><b>MAX</b></h3>
                @if (max) {
                <p>{{ max.value }} %</p>
                } @else {
                <p>-</p>
                }
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './humidity-card.component.scss',
})
export class HumidityCardComponent {
  @Input() humidity: number = 35;
  @Input() min: any;
  @Input() max: any;
}
