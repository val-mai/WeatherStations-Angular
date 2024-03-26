import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MetricCardComponent } from '../cards/metric-card/metric-card.component';
import { HumidityCardComponent } from '../cards/humidity-card/humidity-card.component';
import { VariousCardComponent } from '../cards/various-card/various-card.component';
import { RainCardComponent } from '../cards/rain-card/rain-card.component';
import { RainLevelsCardComponent } from '../cards/rain-levels-card/rain-levels-card.component';
import { WindCardComponent } from '../cards/wind-card/wind-card.component';
import { PressureCardComponent } from '../cards/pressure-card/pressure-card.component';

@Component({
  selector: 'app-station-data',
  standalone: true,
  imports: [
    CommonModule,
    MetricCardComponent,
    HumidityCardComponent,
    VariousCardComponent,
    RainCardComponent,
    RainLevelsCardComponent,
    WindCardComponent,
    PressureCardComponent,
  ],
  template: `
    <div class="divider my-3">DATI TERMOIGROMETRO</div>
    <div class="row inserted">
      <div class="col-md-6 my-2">
        <app-metric-card
          [temperature]="metrics?.temperature.value"
          [feelsLike]="metrics?.feelsLike.value"
          [dewPoint]="metrics?.dewPoint.value"
          [min]="min?.temperature"
          [max]="max?.temperature"
        >
        </app-metric-card>
      </div>
      <div class="col-md-6 my-2">
        <app-humidity-card
          [humidity]="metrics?.humidity.value"
          [min]="min?.humidity"
          [max]="max?.humidity"
        >
        </app-humidity-card>
      </div>
      <!--       <div class="col-md-4 my-2">
        <app-various-card
          [dewPoint]="metrics?.dewPoint?.value"
          [feelsLike]="metrics?.feelsLike?.value"
        >
        </app-various-card>
      </div> -->
    </div>
    <div class="divider my-3">DATI PLUVIOMETRO</div>
    <div class="row inserted">
      <div class="col-md-6 my-2">
        <app-rain-card
          [rainFall]="metrics?.rainFall?.value"
          [rainRate]="metrics?.rainRate?.value"
        ></app-rain-card>
      </div>
      <div class="col-md-6 my-2">
        <app-rain-levels-card
          [event]="metrics?.rainEvent?.value"
          [hourly]="metrics?.rainHour?.value"
          [weekly]="metrics?.rainWeek?.value"
          [monthly]="metrics?.rainMonth?.value"
          [yearly]="metrics?.rainYear?.value"
        ></app-rain-levels-card>
      </div>
      <div class="divider my-3">DATI ANEMOMETRO / BAROMETRO</div>
      <div class="col-md-6 my-2">
        <app-wind-card
          [windSpeed]="metrics?.windSpeed?.value"
          [windGust]="metrics?.windGust?.value"
          [windDirection]="metrics?.windDirection?.value"
          [maxGust]="max?.windGust"
          [maxSpeed]="max?.windSpeed"
        ></app-wind-card>
      </div>
      <div class="col-md-6 my-2">
        <app-pressure-card
          [absolute]="metrics?.pressureAbs?.value"
          [relative]="metrics?.pressure?.value"
          [maxAbs]="max?.pressureAbs"
          [minAbs]="min?.pressureAbs"
          [minRel]="min?.pressure"
          [maxRel]="max?.pressure"
        ></app-pressure-card>
      </div>
      <div class="mb-5"></div>
    </div>
  `,
  styleUrl: './station-data.component.scss',
})
export class StationDataComponent {
  @Input() metrics!: any;
  @Input() max!: any;
  @Input() min!: any;
}
