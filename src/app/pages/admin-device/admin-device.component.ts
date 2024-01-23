import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminToolbarComponent } from 'src/app/components/admin-toolbar/admin-toolbar.component';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-admin-device',
  standalone: true,
  imports: [
    CommonModule, AdminToolbarComponent
  ],
  template: `
  
  <app-admin-toolbar></app-admin-toolbar>
  <section *ngIf="deviceInfo" id="main-section" class="container my-4">
    <h2>{{deviceInfo.name}}</h2>
  </section>

  `,
  styleUrl: './admin-device.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDeviceComponent {

  deviceId!: any;
  deviceInfo!:any;

  constructor(private service: DeviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.getData(this.deviceId);
  }

  private getData(id: string): void {
    this.service.getDeviceById(id).subscribe((resp: any) => {
      this.deviceInfo = resp;
    });
  }

}
