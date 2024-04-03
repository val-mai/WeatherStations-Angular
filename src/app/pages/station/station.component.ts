import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnDestroy,
  inject,
  type OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine,
  faCircleInfo,
  faIgloo,
  faTemperatureLow,
} from '@fortawesome/free-solid-svg-icons';
import { repeat } from 'rxjs';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HistoryTableComponent } from 'src/app/components/history-table/history-table.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { StationChartComponent } from 'src/app/components/station-chart/station-chart.component';
import { StationDataComponent } from 'src/app/components/station-data/station-data.component';
import { StationHomeComponent } from 'src/app/components/station-home/station-home.component';
import { StationInfoComponent } from 'src/app/components/station-info/station-info.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { IWindDistribution } from 'src/app/interfaces/IWindDistribution';
import { DataService } from 'src/app/services/data.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-station',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    SpinnerComponent,
    FooterComponent,
    ToolbarComponent,
    HistoryTableComponent,
    MatTabsModule,
    StationInfoComponent,
    StationHomeComponent,
    StationDataComponent,
    StationChartComponent,
    MatExpansionModule,
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container mt-4">
        <h2 *ngIf="infoData">{{ infoData.name }}</h2>
        @if (metrics) {
        <p *ngIf="metrics">
          Ultimo aggiornamento:
          {{ time | date : "MMM dd, yyyy 'alle' HH:mm:ss" }}
        </p>
        <mat-tab-group
          color="accent"
          [selectedIndex]="selectedTabIndex"
          (selectedIndexChange)="tabChanged($event)"
        >
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faIgloo"></fa-icon>
              HOME
            </ng-template>
            <app-station-home
              [infoData]="infoData"
              [metrics]="metrics"
              [tableData]="tableData"
            ></app-station-home>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faTemperatureLow"></fa-icon>
              DATI COMPLETI
            </ng-template>
            <app-station-data
              [metrics]="metrics"
              [min]="min"
              [max]="max"
            ></app-station-data>
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faChartLine"></fa-icon>
              GRAFICI
            </ng-template>
            <app-station-chart
              *ngIf="tableData && windDistribution"
              [chartData]="tableData"
              [windRose]="windDistribution"
            ></app-station-chart>
            <!-- <div class="my-3 row inserted">
              <div>
                <app-chart
                  [title]="chartTitle"
                  [deviceId]="deviceId"
                  class="chart my-3"
                  *ngIf="tableData"
                  [height]="'60vh'"
                  [data]="tableData"
                ></app-chart>
              </div>
              <div class="mb-3">
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title> Tabella osservazioni </mat-panel-title>
                  </mat-expansion-panel-header>
                  <app-history-table
                    class="mb-3"
                    *ngIf="tableData"
                    [dataSource]="tableData"
                  ></app-history-table>
                </mat-expansion-panel>
              </div>
            </div> -->
          </mat-tab>
          <mat-tab>
            <ng-template mat-tab-label>
              <fa-icon class="mx-2" [icon]="faCircleInfo"></fa-icon>
              INFO STAZIONE
            </ng-template>
            <div class="row inserted">
              <app-station-info [infoData]="infoData"></app-station-info>
            </div>
          </mat-tab>
        </mat-tab-group>

        } @else {
        <app-spinner></app-spinner>
        }
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './station.component.scss',
})
export class StationComponent implements OnInit, OnDestroy, AfterViewInit {
  metrics!: any;
  min!: any;
  max!: any;
  time!: any;
  tableData!: any;
  infoData!: any;
  faIgloo = faIgloo;
  faTemperatureLow = faTemperatureLow;
  faChartLine = faChartLine;
  faCircleInfo = faCircleInfo;
  selectedTabIndex!: number;
  deviceId!: any;
  windDistribution!: IWindDistribution;
  private readonly destroy: DestroyRef = inject(DestroyRef);

  constructor(
    private deviceService: DeviceService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTab();
    this.deviceId = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit(): void {
    this.getData(this.deviceId);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedTabIndex');
  }

  private getData(id: string): void {
    this.deviceService.getDeviceById(id).subscribe((resp: any) => {
      this.infoData = resp;
      this.getDeviceInfo(id);
      this.getHistoryData(id);
    });
  }

  tabChanged(event: any) {
    this.selectedTabIndex = event;
    localStorage.setItem('selectedTabIndex', event);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  }

  getTab() {
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    this.selectedTabIndex = savedTabIndex != null ? parseInt(savedTabIndex) : 0;
  }

  private getDeviceInfo(id: string) {
    this.dataService
      .getRealtimeData(id)
      .pipe(repeat({ delay: 60000 }), takeUntilDestroyed(this.destroy))
      .subscribe((resp: any) => {
        this.time = new Date(resp.time * 1000);
        this.metrics = resp;
      });
  }

  private getHistoryData(id: string) {
    this.dataService
      .getDailyHistory(id)
      .pipe(repeat({ delay: 300000 }), takeUntilDestroyed(this.destroy))
      .subscribe((data: any) => {
        this.tableData = data.observations;
        this.min = data.min;
        this.max = data.max;
        this.getWindDistribution(data.observations);
      });
  }

  private getWindDistribution(observations: any) {
    this.dataService
      .getDailyWindDistribution(observations)
      .subscribe((distribution: IWindDistribution) => {
        this.windDistribution = distribution;
      });
  }
}
