import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { TopStatsTableComponent } from 'src/app/components/top-stats-table/top-stats-table.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    FooterComponent,
    TopStatsTableComponent,
    SpinnerComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container">
        <h2 class="my-3">Statistiche della nostra rete di stazioni</h2>

        <mat-form-field>
          <mat-label>Seleziona data</mat-label>
          <input
            matInput
            [matDatepicker]="picker"
            (dateChange)="selectDate($event)"
          />
          <mat-hint>MM/DD/YYYY</mat-hint>
          <mat-datepicker-toggle
            matIconSuffix
            [for]="picker"
          ></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        @if (render==true) {
        <h3 class="mt-3">Località più fredde:</h3>
        <app-top-stats-table
          [data]="data.mostCold"
          [unit]="'°C'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più calde:</h3>
        <app-top-stats-table
          [data]="data.mostWarm"
          [unit]="'°C'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più piovose:</h3>
        <app-top-stats-table
          [data]="data.mostRainy"
          [unit]="'mm'"
        ></app-top-stats-table>
        <h3 class="my-3">Località più ventose:</h3>
        <app-top-stats-table
          [data]="data.mostWindy"
          [unit]="'km/h'"
        ></app-top-stats-table>
        <h3 class="my-5"></h3>
        } @else if (render==false) {
        <app-spinner></app-spinner>
        }
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  data!: any;
  render!: boolean | null;

  constructor(
    private service: StatisticsService,
    private snackBar: SnackbarService
  ) {}

  selectDate(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value?.toLocaleDateString());
    let date = event.value?.toLocaleDateString().replaceAll('/', '-');
    this.render = false;
    this.service.getNetworkStatistics(date).subscribe({
      next: (resp: any) => {
        this.data = resp;
        this.render = true;
      },
      error: (e) => {
        this.render = null;
        this.snackBar.warning(e.error.message, 'Chiudi');
      },
    });
  }
}
