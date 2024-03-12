import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { TopStatsTableComponent } from 'src/app/components/top-stats-table/top-stats-table.component';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    FooterComponent,
    TopStatsTableComponent,
    SpinnerComponent
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container">
        <h2 class="my-3">Statistiche della nostra rete di stazioni</h2>
        @if (data) {
        <h3>Dati relativi al {{ data.date }}</h3>
        <h3>Località più fredde:</h3>
        <app-top-stats-table
          [data]="data.mostCold"
          [unit]="'°C'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più calde:</h3>
        <app-top-stats-table
          [data]="data.mostCold"
          [unit]="'°C'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più piovose:</h3>
        <app-top-stats-table
          [data]="data.mostCold"
          [unit]="'mm'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più ventose:</h3>
        <app-top-stats-table
          [data]="data.mostCold"
          [unit]="'km/h'"
        ></app-top-stats-table>
        <h3 class="my-3"> - </h3>
        } @else {
        <app-spinner></app-spinner>
        }
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  data!: any;

  constructor(private service: StatisticsService) {}

  ngOnInit(): void {
    this.data = this.service.getNetworkStatistics();
  }
}
