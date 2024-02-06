import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AutosizeModule } from 'ngx-autosize';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    AutosizeModule,
  ],
  template: `
    <h2 mat-dialog-title>Dati Stazione</h2>
    <mat-dialog-content class="mat-typography">
      <div [formGroup]="deviceForm">
        <div class="row">
          <h3>Nome:</h3>
          <mat-form-field color="accent" appearance="outline">
            <input type="text" matInput formControlName="name" />
          </mat-form-field>
        </div>
        <div class="row">
          <h3 class="col-md">Regione:</h3>
          <mat-form-field class="col-md-4" color="accent" appearance="outline">
            <input type="text" matInput formControlName="region" />
          </mat-form-field>
          <h3 class="col-md">Località:</h3>
          <mat-form-field class="col-md-4" color="accent" appearance="outline">
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
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial color="primary" (click)="makeAction()">
        {{ action }}
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './device-modal.component.scss',
})
export class DeviceModalComponent implements OnInit {
  deviceForm!: FormGroup;
  action = 'Aggiungi';

  constructor(
    private formBuilder: FormBuilder,
    private service: DeviceService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<DeviceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
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
      latitude: ['', Validators.required],
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
    if (this.editData) {
      this.deviceForm.setValue(this.editData);
      this.action = 'Aggiorna';
    }
  }

  makeAction() {
    this.editData ? this.updateDevice(this.editData.id) : this.addDevice();
  }

  updateDevice(id: string) {
    if (this.deviceForm.valid) {
      this.service.updateDevice(id, this.deviceForm.value).subscribe({
        next: (resp: any) => {
          this.snackBar.success(resp.stationId + ' aggiornato', 'OK');
          this.dialogRef.close();
        },
        error: (e) => {
          console.log(e);
          this.snackBar.warning(e.error.message, 'Chiudi');
        },
      });
    } else {
      this.snackBar.warning('Controlla i dati inseriti', 'Chiudi');
    }
  }

  addDevice() {
    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);
      this.service.insertDevice(this.deviceForm.value).subscribe({
        next: (resp: any) => {
          this.snackBar.success(resp.stationId + ' aggiunto', 'OK');
          this.dialogRef.close();
        },
        error: (e) => {
          console.log(e);
          this.snackBar.warning(e.error.message, 'Chiudi');
        },
      });
    } else {
      this.snackBar.warning('Controlla i dati inseriti', 'Chiudi');
    }
  }
}
