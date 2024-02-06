import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminToolbarComponent } from 'src/app/components/admin-toolbar/admin-toolbar.component';
import { DeviceTableComponent } from 'src/app/components/device-table/device-table.component';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    AdminToolbarComponent,
    DeviceTableComponent,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <app-admin-toolbar></app-admin-toolbar>
    <section *ngIf="deviceList" id="main-section" class="container my-4">
      <h2>Gestione Stazioni</h2>
      <app-device-table
        [dataSource]="deviceList"
        (entryModified)="ngAfterViewInit()"
      ></app-device-table>
    </section>
  `,
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements AfterViewInit {
  deviceList!: any;

  constructor(private service: DeviceService) {}

  ngAfterViewInit(): void {
    this.service.getAllDevices().subscribe((resp: any) => {
      this.deviceList = resp;
    });
  }
}
