import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rain-levels-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="metric-card">
      <mat-card-header class="pb-3">
        <div class="card-body">
          <img style="width: 60px;" src="../../assets/rain-sensor.png" alt="" />
          <div class="box">
            <h4>LIVELLI PIOGGIA</h4>
            <div class="row">
              <div class="col-md">
                <p>Evento: <b>{{event}}</b> mm</p>
                <p>Oraria: <b>{{hourly}}</b> mm</p>
                <p>Settimanale: <b>{{weekly}}</b> mm</p>
                <p>Mensile: <b>{{monthly}}</b> mm</p>
              </div>
            </div>
          </div>
        </div>
      </mat-card-header>
    </mat-card>
  `,
  styleUrl: './rain-levels-card.component.scss'
})
export class RainLevelsCardComponent {

  @Input() event: any = "-";
  @Input() hourly: any = "-";
  @Input() weekly: any = "-";
  @Input() monthly: any = "-";
  @Input() yearly: any = "-";

}
