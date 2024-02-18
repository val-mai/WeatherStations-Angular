import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-various-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/climatology.png" alt="" />
          <div class="box">
            <h4>VARIE</h4>
            <div>
              <p>Temp. percepita: <b>{{feelsLike}}</b> °C</p>
              <p>Temp. rugiada: <b>{{dewPoint}}</b> °C</p>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './various-card.component.scss'
})
export class VariousCardComponent {

  @Input() feelsLike!:number;
  @Input() dewPoint!:number;

}
