import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faCloudRain, faDroplet, faGaugeHigh, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-metric-widget',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, FontAwesomeModule
  ],
  template: `

    <mat-card>
      <mat-card-title>
        <fa-icon [icon]="faTemperatureHalf" size="lg"></fa-icon>
        <h3>Temperatura:</h3>
        <p>{{metric.temperature.value}} <span>°C</span></p>
      </mat-card-title>
      <mat-card-title>
        <fa-icon [icon]="faGaugeHigh" size="lg"></fa-icon>
        <h3>Pressione:</h3>
        <p>{{metric.pressure.value}} <span>{{metric.pressure.unit}}</span></p>
      </mat-card-title>
      <mat-card-title>
        <fa-icon [icon]="faDroplet" size="lg"></fa-icon>
        <h3>Umidità:</h3>
        <p>{{metric.humidity.value}} <span>{{metric.humidity.unit}}</span></p>
      </mat-card-title>
      <mat-card-title>
        <fa-icon [icon]="faCloudRain" size="lg"></fa-icon>
        <h3>Precipitazioni:</h3>
        <p>{{metric.rainFall.value}} <span>{{metric.rainFall.unit}}</span></p>
      </mat-card-title>
      <mat-card-title>
        <fa-icon [icon]="faWind" size="lg"></fa-icon>
        <h3>Vento:</h3>
        <p>{{metric.windSpeed.value}} <span>{{metric.windSpeed.unit}}</span></p>
      </mat-card-title>
    </mat-card>

  `,
  styleUrl: './metric-widget.component.scss'
})
export class MetricWidgetComponent {

  faTemperatureHalf = faTemperatureHalf;
  faGaugeHigh = faGaugeHigh;
  faDroplet = faDroplet;
  faCloudRain = faCloudRain;
  faWind = faWind;

  @Input() metric!: any

}
