import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faCircleExclamation, faPenToSquare, faTrashCan, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-device-table',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, FontAwesomeModule, MatButtonModule, RouterModule, MatMenuModule
  ],
  template: `

  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Nome stazione </th>
    <td mat-cell *matCellDef="let row"> {{row.name}} </td>
  </ng-container>

  <!-- StationID Column -->
  <ng-container matColumnDef="stationId">
    <th mat-header-cell *matHeaderCellDef> ID Stazione </th>
    <td mat-cell *matCellDef="let row"> {{row.stationId}} </td>
  </ng-container>

  <!-- Mac Column -->
  <ng-container matColumnDef="mac">
    <th mat-header-cell *matHeaderCellDef> MAC Address </th>
    <td mat-cell *matCellDef="let row"> {{row.mac}} </td>
  </ng-container>

  <!-- Città Column -->
  <ng-container matColumnDef="city">
    <th mat-header-cell *matHeaderCellDef> Città </th>
    <td mat-cell *matCellDef="let row"> {{row.city}} </td>
  </ng-container>

  <!-- Status Column -->
  <ng-container matColumnDef="status">
    <th mat-header-cell *matHeaderCellDef> Status </th>
    <td mat-cell *matCellDef="let row">
      @if (row.online) {
        <fa-icon size="xl" [icon]="faCircleCheck" style="color: green"></fa-icon>
      } @else {
        <fa-icon size="xl" [icon]="faCircleExclamation" style="color: yellow"></fa-icon>
      }
    </td>
  </ng-container>

  <!-- Actions Column -->
  <ng-container matColumnDef="actions">
    <th mat-header-cell *matHeaderCellDef></th>
    <td mat-cell *matCellDef="let row">
    <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
      <fa-icon size="lg" [icon]="faEllipsisVertical" style="color: grey"></fa-icon>
    </button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item routerLink="/edit/{{row.id}}" routerLinkActive="router-link-active">
        <fa-icon size="lg" [icon]="faPenToSquare" style="color:cadetblue"></fa-icon>
        <span class="mx-2">Modifica Info</span>
      </button>
      <button mat-menu-item disabled>
      <fa-icon size="lg" [icon]="faTrashCan" style="color: red;"></fa-icon>
        <span class="mx-2">Elimina</span>
      </button>
    </mat-menu>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>

  `,
  styleUrl: './device-table.component.scss'
})
export class DeviceTableComponent {

  @Input() dataSource!: any;
  displayedColumns: string[] = ['name', 'stationId', 'mac', 'city', 'status', 'actions'];

  faCircleCheck = faCircleCheck;
  faCircleExclamation = faCircleExclamation;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faEllipsisVertical = faEllipsisVertical;

}
