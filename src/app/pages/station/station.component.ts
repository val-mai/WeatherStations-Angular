import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  type OnInit,
} from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
    MatButtonToggleModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container mt-4">
        @if (metrics) {
        <div class="title-box mb-3">
          <h2 *ngIf="infoData">{{ infoData.name }}</h2>
          <p *ngIf="metrics">
            Ultimo aggiornamento:
            {{ time | date : "MMM dd, yyyy 'alle' HH:mm:ss" }}
          </p>
          <mat-button-toggle-group
            appearance="legacy"
            [formControl]="historyModeControl"
            aria-label="History mode"
          >
            <mat-button-toggle value="daily" checked>1g</mat-button-toggle>
            <mat-button-toggle value="weekly">7gg</mat-button-toggle>
            <mat-button-toggle value="monthly">1m</mat-button-toggle>
          </mat-button-toggle-group>
        </div>
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
              *ngIf="tableData"
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
              *ngIf="tableData"
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

  historyModeControl = new FormControl('');
  historyMode: string = 'daily';

  constructor(
    private deviceService: DeviceService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTab();
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.historyModeControl.valueChanges.subscribe(() => {
      this.historyMode = this.historyModeControl.value
        ? this.historyModeControl.value
        : 'daily';
      this.metrics = null;
      this.tableData = null;
      this.getData(this.deviceId);
    });
  }

  ngAfterViewInit(): void {
    this.getData(this.deviceId);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
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
    this.dataService.getRealtimeData(id).subscribe((resp: any) => {
      this.time = new Date(resp.time * 1000);
      this.metrics = resp;
    });
  }

  private getHistoryData(id: string) {
    console.log(this.historyMode);
    this.dataService
      .getSelectedHistory(id, this.historyMode)
      .subscribe((data: any) => {
        this.tableData = data.observations;
        this.min = data.min;
        this.max = data.max;
        console.log(this.min);
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
