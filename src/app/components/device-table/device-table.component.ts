import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
  faPenToSquare,
  faImages,
  faTrashCan,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { DeviceModalComponent } from '../device-modal/device-modal.component';
import { DeviceService } from 'src/app/services/device.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ConfirmDialogModel,
  ConfirmModalComponent,
} from '../confirm-modal/confirm-modal.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeviceImageModalComponent } from '../device-image-modal/device-image-modal.component';

@Component({
  selector: 'app-device-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
  ],
  template: `
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <!-- Name Column -->
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nome stazione</th>
        <td mat-cell *matCellDef="let row">{{ row.name }}</td>
      </ng-container>

      <!-- StationID Column -->
      <ng-container matColumnDef="stationId">
        <th mat-header-cell *matHeaderCellDef>ID Stazione</th>
        <td mat-cell *matCellDef="let row">{{ row.stationId }}</td>
      </ng-container>

      <!-- Mac Column -->
      <ng-container matColumnDef="mac">
        <th mat-header-cell *matHeaderCellDef>MAC Address</th>
        <td mat-cell *matCellDef="let row">{{ row.mac }}</td>
      </ng-container>

      <!-- Città Column -->
      <ng-container matColumnDef="city">
        <th mat-header-cell *matHeaderCellDef>Città</th>
        <td mat-cell *matCellDef="let row">{{ row.city }}</td>
      </ng-container>

      <!-- Status Column -->
      <ng-container matColumnDef="status">
        <th mat-header-cell *matHeaderCellDef>Status</th>
        <td
          mat-cell
          *matCellDef="let row"
          matTooltip="{{ getLastUpdate(row.lastUpdate) }}"
        >
          @if (row.online) {
          <fa-icon
            size="xl"
            [icon]="faCircleCheck"
            style="color: green"
          ></fa-icon>
          } @else {
          <fa-icon
            size="xl"
            [icon]="faCircleExclamation"
            style="color: red"
          ></fa-icon>
          }
        </td>
      </ng-container>

      <!-- Actions Column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let row">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <fa-icon
              size="lg"
              [icon]="faEllipsisVertical"
              style="color: grey"
            ></fa-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button mat-menu-item (click)="editDevice(row.id)">
              <div class="menu-item">
                <div class="icon-box">
                  <fa-icon
                    size="lg"
                    [icon]="faPenToSquare"
                    style="color:#5276b8"
                  ></fa-icon>
                </div>
                <div class="mx-2">Modifica Info</div>
              </div>
            </button>
            <button mat-menu-item (click)="editDeviceImages(row.id)">
              <div class="menu-item">
                <div class="icon-box">
                  <fa-icon
                    size="lg"
                    [icon]="faImages"
                    style="color:#00897b"
                  ></fa-icon>
                </div>
                <div class="mx-2">Gestisci Immagini</div>
              </div>
            </button>
            <button mat-menu-item (click)="deleteDevice(row)">
              <div class="menu-item">
                <div class="icon-box">
                  <fa-icon
                    size="lg"
                    [icon]="faTrashCan"
                    style="color: red"
                  ></fa-icon>
                </div>
                <div class="mx-2">Elimina</div>
              </div>
            </button>
          </mat-menu>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <div class="add-button">
      <button mat-mini-fab color="primary" (click)="addDevice()">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styleUrl: './device-table.component.scss',
})
export class DeviceTableComponent {
  @Input() dataSource!: any;
  @Output() entryModified: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = [
    'name',
    'stationId',
    'mac',
    'city',
    'status',
    'actions',
  ];

  faCircleCheck = faCircleCheck;
  faCircleExclamation = faCircleExclamation;
  faPenToSquare = faPenToSquare;
  faImages = faImages;
  faTrashCan = faTrashCan;
  faEllipsisVertical = faEllipsisVertical;

  constructor(
    public dialog: MatDialog,
    private service: DeviceService,
    private snackbar: SnackbarService
  ) {}

  editDevice(id: string) {
    this.service.getDeviceById(id).subscribe({
      next: (device) => {
        this.dialog
          .open(DeviceModalComponent, {
            data: device,
            width: '70%',
          })
          .afterClosed()
          .subscribe(() => {
            this.entryModified.emit();
          });
      },
    });
  }

  editDeviceImages(id: string) {
    this.service.getDeviceImages(id).subscribe({
      next: (deviceImages) => {
        console.log(deviceImages);
        this.dialog
          .open(DeviceImageModalComponent, {
            data: deviceImages,
            width: '70%',
          })
          .afterClosed()
          .subscribe(() => {
            this.entryModified.emit();
          });
      },
    });
  }

  deleteDevice(device: any) {
    const dialogData = new ConfirmDialogModel(
      'Eliminazione stazione',
      `Sei sicuro di voler eliminare la stazione ${device.name} - ${device.stationId}?`
    );
    const dialogRef = this.dialog
      .open(ConfirmModalComponent, {
        maxWidth: '400px',
        data: dialogData,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.delete(device);
          this.entryModified.emit();
        }
      });
  }

  private delete(device: any) {
    this.service.deleteDevice(device.id).subscribe({
      next: () => {
        this.snackbar.success('Stazione eliminata', 'Chiudi');
        this.entryModified.emit();
      },
      error: (err) => {
        this.snackbar.warning(err.error, 'Chiudi');
      },
    });
  }

  addDevice() {
    this.dialog
      .open(DeviceModalComponent, {
        width: '70%',
      })
      .afterClosed()
      .subscribe(() => {
        this.entryModified.emit();
      });
  }

  getLastUpdate(timestamp: number): string {
    const date = new Date(timestamp * 1000).toLocaleString();
    return `Ultimo aggiornamento:
    ${date}`;
  }
}
