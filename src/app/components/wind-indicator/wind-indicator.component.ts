import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wind-indicator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wind-indicator">
      <div class="wind-speed">{{ windSpeed }}</div>
      <div class="wind-arrow-wrapper">
        <div class="wind-arrow" [style.transform]="'rotate(' + windDirection + 'deg)'">&#8593;</div>
      </div>
    </div>
  `,
  styleUrl: './wind-indicator.component.scss'
})
export class WindIndicatorComponent {

  @Input() windSpeed: number = 0;
  @Input() windDirection: number = 0;

}
