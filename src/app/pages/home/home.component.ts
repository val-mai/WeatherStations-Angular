import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { faMagnifyingGlassChart, faRss, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FeatureCardComponent } from 'src/app/components/feature-card/feature-card.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { TemperatureMapComponent } from 'src/app/components/temperature-map/temperature-map.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TemperatureMapComponent,
    RouterModule,
    ToolbarComponent,
    MatButtonModule,
    FeatureCardComponent,
    FooterComponent
  ],
  template: `
    <div class="main">
      <app-toolbar [transparent]="true"></app-toolbar>
      <div class="main-content">
      <section id="main-section" class="container">
        <div class="hero">
          <img class="logo mb-3" src="assets/logo.png" alt="">
          <p>
            Benvenuto su MeteoMarso, la tua porta d'accesso alle informazioni
            meteorologiche più avanzate della regione.
          </p>
          <p class="mb-3">
            Esplora la nostra rete di stazioni meteo professionali e webcam
            sempre aggiornate in tempo reale.
          </p>
          <div class="d-md-flex justify-content-center">
            <button class="m-3 p-4" mat-raised-button color="primary" routerLink="/map" >
              Mappa live
            </button>
            <button class="m-3 p-4" mat-raised-button>Contattaci</button>
          </div>
        </div>
      </section>
      <section id="feature-section" class="container">
        <h3><b> Caratteristiche Principali </b></h3>
        <div class="card-container">
          @for (item of featureList; track $index) {
            <app-feature-card [content]="item"></app-feature-card>
          }
        </div>
      </section>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  featureList = [
    {
      title: 'Dettagli Precisi in Tempo Reale',
      description: "Accedi a dati meteorologici dettagliati provenienti da stazioni meteo professionali.",
      icon: faRss
    },
    {
      title: 'Visualizza il Mondo con le Webcam',
      description: "Osserva il clima dal vivo attraverso le nostre webcam sempre aggiornate.",
      icon: faVideo
    },
    {
      title: 'Analisi Meteorologiche Avanzate',
      description: "Utilizza strumenti avanzati per analizzare dati dettagliati e ottenere previsioni affidabili.",
      icon: faMagnifyingGlassChart
    },
  ];

}
