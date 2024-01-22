import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { divIcon, latLng, marker, tileLayer } from 'leaflet';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-temperature-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  template: `
    <div class="map"
      [style.height]="height"
      *ngIf="options"
      leaflet
      [leafletOptions]="options"
    >
      <div *ngIf="layers" [leafletLayers]="layers"></div>
    </div>
  `,
  styleUrl: './temperature-map.component.scss',
})
export class TemperatureMapComponent implements OnInit {

  @Input() devices!: any[];
  @Input() height!: any;

  options!: any;
  layers!: any;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.initMap(this.devices);
  }

  initMap(devices: any) {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'MeteoMarso',
        }),
      ],
      zoom: 11,
      center: latLng(42.102442, 13.395158),
    };

    this.layers = [];
    devices.forEach((d: any) => {
      this.deviceService.getDevicesInfo(d.id).subscribe((info: any) => {
        const customIcon = divIcon({
          className: 'custom-marker',
          iconSize: [30, 30],
          html: `<div style="${this.getMarkerStyle(
            parseFloat(info.weatherData.temperature.value)
          )}"><b>${info.weatherData.temperature.value}</b></div>`,
          iconAnchor: [15, 15],
        });

        const customMarker = marker([info.latitude, info.longitude], {
          icon: customIcon,
          title: info.name,
        });

        const popupContent = `
        <div class="mt-2">
          <h3><a href="stations/${d.id}"><strong>${info.name}</strong></a></h3>
          <p class="mt-2">Temperatura: ${info.weatherData.temperature.value}°C </p>
          <p>Umidità: ${info.weatherData.humidity.value}% </p>
        </div>
        `;

        customMarker.bindPopup(popupContent);
        this.layers.push(customMarker);
      });
    });
  }

  getMarkerStyle(temperature: number) {
    const normalizedTemperature = (temperature + 10) / 50;

    const hue = (1 - normalizedTemperature) * 240;
    const backgroundColor = `hsl(${hue}, 100%, 50%)`;

    return `background-color: ${backgroundColor}; 
    border-radius: 50%; 
    line-height:30px;
    text-align:center;
    color: white;
    mix-blend-mode: difference;
    border: 1px solid black`;
  }
}
