import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { DataService } from 'src/app/services/data.service';
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
        <div class="heading">
          <h2 class="my-3">
            Statistiche della nostra rete di stazioni
            {{ date | date : 'dd-MM-yyyy' }}
          </h2>
          <mat-form-field class="mt-3">
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
        </div>

        @if (message) {
        <p>Dati del {{ date | date : 'dd-MM-yyyy' }} non disponibili</p>
        } @if (render==true) {
        <div class="mb-5"></div>
        <h3 class="my-3">Località più fredde:</h3>
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
        } @else if (render==false) {
        <div class="mb-5"></div>
        <app-spinner></app-spinner>
        }
      </div>
      <div class="spacer"></div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  data!: any;
  render!: boolean | null;
  date!: any;
  message!: string;

  constructor(private service: StatisticsService) {}

  ngOnInit(): void {
    this.date = new Date();
    this.date.setDate(this.date.getDate() - 1);
    this.getStats(this.date);
  }

  selectDate(event: MatDatepickerInputEvent<Date>) {
    this.date = event.value;
    this.render = false;
    this.getStats(this.date);
  }

  private getStats(date: any) {
    let dateString = date.toLocaleDateString().replaceAll('/', '-');
    this.render = false;
    this.service.getNetworkStatistics(dateString).subscribe({
      next: (resp: any) => {
        this.data = resp;
        this.render = true;
        this.message = '';
      },
      error: (e) => {
        this.render = null;
        this.message = 'Dati non disponibili';
      },
    });
  }
}
