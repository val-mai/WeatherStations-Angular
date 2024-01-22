import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-station-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <h2 class="mt-4" color="accent">Dettagli Stazione</h2>
  <div class="row">
  <div class="col-md-6">
    <p><b>ID stazione meteo Wunderground:</b> {{infoData.stationId}}</p>
    <p><b>Nome della stazione:</b> {{infoData.name}} </p>
    <p><b>Latitudine / longitudine:</b> {{infoData.latitude}}° N, {{infoData.longitude}}° E </p>
    <p><b>Elevazione:</b> {{infoData.elevation}} metri s.l.m. </p>
    <p><b>Città:</b> {{infoData.city}} </p>
    <p><b>Regione:</b> {{infoData.region}} </p>
    <p><b>Hardware:</b> {{infoData.hardware}} </p>
    <p><b>Gateway:</b> {{infoData.gateway}} </p>
    <p><b>Schermatura:</b> {{infoData.shielding}} </p>
    <p><b>Tipo di installazione:</b> {{infoData.installation}} </p>
  </div>
  <div class="col-md-6">
    <img src="{{infoData.stationImage}}" alt="">
  </div>
  </div>
  <div>
    <h2 class="mt-4" color="accent">Descrizione morfologica e climatologica della località</h2>
    <p class="description">
      {{infoData.description}}
    </p>
  </div>
  `,
  styleUrl: './station-info.component.scss',
})

export class StationInfoComponent {

  @Input() infoData: any;

}