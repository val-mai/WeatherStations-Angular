import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { TemperatureMapComponent } from 'src/app/components/temperature-map/temperature-map.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    CommonModule,
    LeafletModule,
    TemperatureMapComponent,
    ToolbarComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  template: `
    <div class="main mat-app-background">
      <app-toolbar></app-toolbar>
      <div class="container">
        <h2 class="my-3">Mappa live delle stazioni</h2>
        @if (devices) {
        <app-temperature-map
          [height]="mapHeight"
          *ngIf="devices"
          [devices]="devices"
          [zoomLevel]="zoomLevel"
        ></app-temperature-map>
        } @else {
        <app-spinner></app-spinner>
        }
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styleUrl: './map-page.component.scss',
})
export class MapPageComponent implements OnInit {
  devices!: any[];
  mapHeight = '80vh';
  mobile = false;
  zoomLevel!: number;

  constructor(
    private service: DeviceService,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
        this.zoomLevel = this.mobile ? 8 : 8;
      });
    this.service.getAllDevices().subscribe((data: any) => {
      this.devices = data;
    });
  }
}
