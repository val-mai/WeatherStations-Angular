import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Metric } from 'src/app/interfaces/metric';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, FontAwesomeModule
  ],
  template: `
  <mat-card class="metric-card">
    <mat-card-content>
      <h4>
        {{metric.title}}
      </h4>
    </mat-card-content>
    <mat-card-header class="pb-3">
      <div class="card-body">
        <div>
          <mat-card-title>{{metric.value}}</mat-card-title>
          <mat-card-subtitle>{{metric.unit}}</mat-card-subtitle>
        </div>
        <fa-icon [icon]="metric.icon" size="2x"></fa-icon>
      </div>
    </mat-card-header>
  </mat-card>
  `,
  styleUrl: './metric-card.component.scss'
})
export class MetricCardComponent {

  @Input() metric!: Metric;

  constructor() {
  }

  

}
