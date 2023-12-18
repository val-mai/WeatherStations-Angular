import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Metric } from 'src/app/interfaces/metric';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [
    CommonModule, MatCardModule
  ],
  template: `
  <mat-card class="metric-card">
    <mat-card-header>
      <mat-card-title>{{metric.title}}</mat-card-title>
      <mat-card-subtitle>{{metric.device}}</mat-card-subtitle>
    </mat-card-header>
    <mat-card-content>
      <p>
        {{metric.value}}
      </p>
      <hr>
      <p>Last Update: {{ metric.last_update | date: 'medium' }}</p>
    </mat-card-content>
  </mat-card>
  `,
  styleUrl: './metric-card.component.scss'
})
export class MetricCardComponent {

  @Input() metric!:Metric;

  constructor() {
  }

}
