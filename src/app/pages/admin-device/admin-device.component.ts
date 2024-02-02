import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AutosizeModule } from 'ngx-autosize';
import { AdminToolbarComponent } from 'src/app/components/admin-toolbar/admin-toolbar.component';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-admin-device',
  standalone: true,
  imports: [
    CommonModule,
    AdminToolbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AutosizeModule,
    MatButtonModule,
  ],
  template: `
    <app-admin-toolbar></app-admin-toolbar>
    <section id="main-section" class="container my-4">
      <div class="header mb-4 mt-2">
        <h2>Modifica dati stazione</h2>
        <button mat-raised-button color="primary" (click)="updateDevice()">
          AGGIORNA
        </button>
      </div>
      <div [formGroup]="deviceForm">
        <div class="row">
          <h3 class="col-md">Nome:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="name" />
          </mat-form-field>
          <h3 class="col-md">Regione:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="region" />
          </mat-form-field>
          <h3 class="col-md">Località:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="city" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Lat:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="number" matInput formControlName="latitude" />
          </mat-form-field>
          <h3 class="col-md">Lon:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="number" matInput formControlName="longitude" />
          </mat-form-field>
          <h3 class="col-md">Elev:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="number" matInput formControlName="elevation" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Id Stazione:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="stationId" />
          </mat-form-field>
          <h3 class="col-md">Mac:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="mac" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Installazione:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="installation" />
          </mat-form-field>
          <h3 class="col-md">Gateway:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="gateway" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Hardware:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="hardware" />
          </mat-form-field>
          <h3 class="col-md">Schermatura:</h3>
          <mat-form-field class="col-md-3" color="accent" appearance="outline">
            <input type="text" matInput formControlName="shielding" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Descrizione:</h3>
          <mat-form-field class="col-md-10" color="accent" appearance="fill">
            <textarea
              autosize
              class="text-area"
              type="text"
              matInput
              formControlName="description"
            ></textarea>
          </mat-form-field>
        </div>
      </div>
    </section>
  `,
  styleUrl: './admin-device.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDeviceComponent implements OnInit {
  deviceId!: any;
  deviceInfo!: any;
  deviceForm!: FormGroup;

  constructor(
    private service: DeviceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id');
    this.getData(this.deviceId);
    this.deviceForm = this.formBuilder.group({
      id: [''],
      online: [''],
      name: ['', Validators.required],
      type: [''],
      stationId: ['', Validators.required],
      mac: [''],
      city: ['', Validators.required],
      region: ['', Validators.required],
      dateZoneId: [''],
      createTime: [''],
      elevation: ['', Validators.required],
      latitude: [Validators.required],
      longitude: [Validators.required],
      image: [''],
      stationImages: [''],
      stationType: [''],
      hardware: [''],
      gateway: [''],
      shielding: [''],
      installation: [''],
      description: [''],
      note: [''],
    });
  }

  getData(id: string): void {
    this.service.getDeviceById(id).subscribe((resp: any) => {
      this.deviceInfo = resp;
      this.deviceForm.setValue(this.deviceInfo);
    });
  }

  updateDevice() {
    const request = this.deviceForm.value;
    console.log(request);
    if (this.deviceForm.valid) {
      this.service
        .updateDevice(this.deviceId, this.deviceForm.value)
        .subscribe({
          next: (resp: any) => {
            this.snackBar.success(resp.stationId + " aggiornato", "OK")
            this.router.navigateByUrl('/admin');
          },
          error: (e) => {
            console.log(e);
            this.snackBar.warning(e.error.message, "Chiudi")
          }
        })
    } else {
      this.snackBar.warning("Controlla i dati inseriti", "Chiudi");
    }
  }
}
