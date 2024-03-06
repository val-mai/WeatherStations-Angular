import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { DeviceService } from 'src/app/services/device.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-device-image-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FontAwesomeModule,
  ],
  template: `
    <h2 mat-dialog-title>Gestione immagini {{ editData.stationId }}</h2>
    <mat-dialog-content class="mat-typography">
      <div [formGroup]="deviceImagesForm">
        <h3 class="col-md">Immagine località:</h3>
        <mat-form-field class="col-md-8" color="accent" appearance="outline">
          <input type="text" matInput formControlName="image" />
        </mat-form-field>
        <img
          *ngIf="editData.image"
          class="mx-2"
          src="{{ editData.image }}"
          style="height: 57px;"
        />
        <h3 class="col-md">Webcam</h3>
        <div formGroupName="webcam">
          <h4 class="col-md">Pagina:</h4>
          <mat-form-field class="col-md-8" color="accent" appearance="outline">
            <input type="text" matInput formControlName="page" />
          </mat-form-field>
          <h4 class="col-md">Immagine:</h4>
          <mat-form-field class="col-md-8" color="accent" appearance="outline">
            <input type="text" matInput formControlName="url" />
          </mat-form-field>
        </div>
        <div formArrayName="stationImages">
          <h3 class="col-md">Immagini stazione:</h3>
          <div
            *ngFor="let stationImage of stationImages.controls; let i = index"
          >
            <mat-form-field
              appearance="outline"
              class="col-md-8"
              color="accent"
            >
              <input
                type="text"
                matInput
                id="stationImage-{{ i }}"
                type="text"
                [formControlName]="i"
              />
            </mat-form-field>
            <img
              *ngIf="editData.stationImages"
              class="mx-2"
              src="{{ editData.stationImages[i] }}"
              style="height: 57px;"
            />
            <button
              style="color: red;"
              mat-icon-button
              (click)="removeStationImage(i)"
            >
              -
            </button>
          </div>
          <button mat-icon-button (click)="addStationImage()">+</button>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button
        mat-button
        cdkFocusInitial
        color="primary"
        (click)="updateDeviceImages(editData.id)"
      >
        {{ action }}
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './device-image-modal.component.scss',
})
export class DeviceImageModalComponent {
  deviceImagesForm!: FormGroup;
  action = 'Aggiorna';
  stationImages!: FormArray;
  faMinus = faMinus;

  constructor(
    private formBuilder: FormBuilder,
    private service: DeviceService,
    private snackBar: SnackbarService,
    private dialogRef: MatDialogRef<DeviceImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.deviceImagesForm = this.formBuilder.group({
      image: [''],
      id: [''],
      stationId: [''],
      webcam: this.formBuilder.group({
        page: [''],
        url: [''],
      }),
      stationImages: this.formBuilder.array([new FormControl()]),
    });
    this.stationImages = this.deviceImagesForm.get(
      'stationImages'
    ) as FormArray;
    this.deviceImagesForm.patchValue({
      image: this.editData.image,
      webcam: this.editData.webcam,
      stationId: this.editData.stationId,
      id: this.editData.id,
    });
    for (let index in this.editData.stationImages) {
      if (index == '0' && this.editData.stationImages.length > 1) {
        this.stationImages.patchValue([this.editData.stationImages[index]]);
      } else {
        (
          this.deviceImagesForm.controls['stationImages'] as FormArray
        ).controls.push(new FormControl(this.editData.stationImages[index]));
      }
    }
  }

  addStationImage() {
    this.stationImages.push(this.formBuilder.control(''));
  }

  removeStationImage(i: number) {
    this.stationImages.removeAt(i);
  }

  updateDeviceImages(id: string) {
    console.log(this.deviceImagesForm.value);
    if (this.deviceImagesForm.valid) {
      this.service
        .updateDeviceImages(id, this.deviceImagesForm.value)
        .subscribe({
          next: () => {
            this.snackBar.success(
              'Immagini di ' + this.editData.stationId + ' aggiornate',
              'OK'
            );
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
