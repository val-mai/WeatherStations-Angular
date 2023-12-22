import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { TemperatureMapComponent } from 'src/app/components/temperature-map/temperature-map.component';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TemperatureMapComponent],
  template: `
    <div class="container mt-4">
      <h2 class="my-3">Le nostre stazioni meteo</h2>
      <app-temperature-map [height]="mapHeight"
        *ngIf="devices"
        [devices]="devices"
      ></app-temperature-map>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  devices!: any[];
  mapHeight = "600px";

  constructor(private service: DeviceService) {}

  ngOnInit(): void {
    this.service.getAllDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }
}
