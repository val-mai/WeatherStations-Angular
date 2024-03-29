import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { divIcon, latLng, marker, tileLayer } from 'leaflet';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-temperature-map',
  standalone: true,
  imports: [CommonModule, LeafletModule],
  template: `
    <div
      class="map"
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
  @Input() zoomLevel!: number;

  options!: any;
  layers!: any;
  mobile = false;
  center = {
    lat: 0,
    lon: 0,
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.initMap(this.devices);
  }

  initMap(devices: any) {
    this.setCenter();
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'MeteoMarso',
        }),
      ],
      zoom: this.zoomLevel,
      center: latLng(this.center.lat, this.center.lon),
    };

    this.layers = [];
    devices.forEach((d: any) => {
      this.dataService.getRealtimeData(d.id).subscribe((data: any) => {
        const temp = data.temperature.value;
        const customIcon = divIcon({
          className: 'custom-marker',
          iconSize: [24, 24],
          html: `<div style="${this.getMarkerStyle(parseFloat(temp))}"><b>${
            temp.toFixed(0) == 0 ? '0' : temp.toFixed(0)
          }</b></div>`,
          iconAnchor: [12, 12],
        });

        const customMarker = marker([d.latitude, d.longitude], {
          icon: customIcon,
          title: d.name,
        });

        const popupContent = `
        <div class="mt-2">
          <h3><a href="stations/${d.id}"><strong>${d.name}</strong></a></h3>
          <p class="mt-2">Temperatura: ${
            temp.toFixed(0) == 0 ? '0' : temp.toFixed(0)
          }°C </p>
          <p>Umidità: ${data.humidity.value}% </p>
        </div>
        `;

        customMarker.bindPopup(popupContent);
        this.layers.push(customMarker);
      });
    });
  }

  getMarkerStyle(temperature: number) {
    const normalizedTemperature = (temperature + 10) / 45;

    const hue = (1 - normalizedTemperature) * 240;

    const backgroundColor = `hsl(${hue}, 100%, 50%)`;
    const textColor = temperature < 1 || temperature > 25 ? 'white' : 'black';

    return `background-color: ${backgroundColor};
    border-radius: 50%;
    line-height:24px;
    text-align:center;
    color: ${textColor};
    mix-blend-mode: difference;
    border: 1px solid black`;
  }

  setCenter() {
    let latArray: number[] = [];
    let lonArray: number[] = [];
    this.devices.forEach((d) => {
      latArray.push(d.latitude);
      lonArray.push(d.longitude);
    });
    this.center.lat = (Math.max(...latArray) + Math.min(...latArray)) / 2;
    this.center.lon = (Math.max(...lonArray) + Math.min(...lonArray)) / 2;
  }
}
