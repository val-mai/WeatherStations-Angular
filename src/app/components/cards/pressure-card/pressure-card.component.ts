import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pressure-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-content>
        <h4>PRESSIONE</h4>
      </mat-card-content>
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/pressure.png" alt="" />
          <!-- <fa-icon [icon]="faTemperature" size="5x"></fa-icon> -->
          <div class="box">
            <div class="main-data">
              <mat-card-title class="mx-1">
                <h3>
                  {{ pressure }}
                </h3>
              </mat-card-title>
              <mat-card-subtitle>hPa</mat-card-subtitle>
            </div>
            <div class="sub-data">
              <div>
                <h3><b>MIN</b></h3>
                @if (min) {
                  <p>{{min.value}} hPa</p>
                } @else {
                  <p> - </p>
                }
              </div>
              <div>
                <h3><b>MAX</b></h3>
                @if (max) {
                  <p>{{max.value}} hPa</p>
                } @else {
                  <p> - </p>
                }
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './pressure-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PressureCardComponent {

  @Input() pressure: number = 35;
  @Input() min:any;
  @Input() max:any;

}
