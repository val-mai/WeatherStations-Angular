import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TemperatureMapComponent } from 'src/app/components/temperature-map/temperature-map.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    TemperatureMapComponent,
    ToolbarComponent,
    FooterComponent
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container">
        <h2 class="my-3">Mappa live delle stazioni</h2>
        <app-temperature-map
          [height]="mapHeight"
          *ngIf="devices"
          [devices]="devices"
        ></app-temperature-map>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent implements OnInit {
  devices!: any[];
  mapHeight = '600px';

  constructor(private service: DeviceService) {}

  ngOnInit(): void {
    this.service.getAllDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }
}
