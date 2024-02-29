import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-station-info',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  template: `
    <div class="divider my-3">DETTAGLI STAZIONE</div>
    <div class="row inserted">
      <div class="col-md-6 details">
        <p><b>ID stazione meteo Wunderground:</b> {{ infoData.stationId }}</p>
        <p><b>Nome della stazione:</b> {{ infoData.name }}</p>
        <p>
          <b>Latitudine / Longitudine:</b> {{ infoData.latitude | number }}° N,
          {{ infoData.longitude | number }}° E
        </p>
        <p><b>Elevazione:</b> {{ infoData.elevation }} metri s.l.m.</p>
        <p><b>Città:</b> {{ infoData.city }}</p>
        <p><b>Regione:</b> {{ infoData.region }}</p>
        <p><b>Hardware:</b> {{ infoData.hardware }}</p>
        <p><b>Gateway:</b> {{ infoData.gateway }}</p>
        <p><b>Schermatura:</b> {{ infoData.shielding }}</p>
        <p><b>Tipo di installazione:</b> {{ infoData.installation }}</p>
      </div>
      <div class="col-md-6">
        <app-carousel [images]="infoData.stationImages"></app-carousel>
      </div>
    </div>
    <div>
      <div class="divider my-3">DESCRIZIONE MORFOLOGiA E CLIMATOLOGA'</div>
      <div class="row inserted">
        <p class="description">
          {{ infoData.description }}
        </p>
      </div>
    </div>
    <div class="mb-5"></div>
  `,
  styleUrl: './station-info.component.scss',
})
export class StationInfoComponent {
  @Input() infoData: any;
}
