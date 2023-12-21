import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { circleMarker, latLng, tileLayer } from 'leaflet';
import { Device } from 'src/app/interfaces/device';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  template: `
    <div class="container mt-4">
      <h2 class="my-3">Le nostre stazioni meteo</h2>
      <div *ngIf="options" class="map" leaflet [leafletOptions]="options">
        <div *ngIf="layers" [leafletLayers]="layers"></div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  options!: any;
  layers!: any;
  devices!: any;

  constructor(private service: DeviceService) {}

  ngOnInit(): void {
    this.service.getAllDevices().subscribe((data: any) => this.initMap(data));
  }

  initMap(devices: Device[]) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '...',
        }),
      ],
      zoom: 11,
      center: latLng(42.069968, 13.253143),
    };

    this.layers = [];
    devices.forEach((d) => {
      const marker = circleMarker([d.latitude, d.longitude]);

      const popupContent = `
        <strong>${d.name}</strong><br>
        Latitudine: ${d.latitude}<br>
        Longitudine: ${d.longitude}<br>
        <a href="/stations/${d.id}">Vai alla pagina del dispositivo</a>
      `;

      marker.bindPopup(popupContent);

      this.layers.push(marker);
    });
  }
}
