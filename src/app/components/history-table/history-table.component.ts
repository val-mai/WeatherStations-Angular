import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    CommonModule, MatTableModule
  ],
  template: `
  
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- Time Column -->
  <ng-container matColumnDef="time">
    <th mat-header-cell *matHeaderCellDef> Orario </th>
    <td mat-cell *matCellDef="let row"> {{row.time | date : 'medium'}} </td>
  </ng-container>
  
  <!-- Temperature Column -->
  <ng-container matColumnDef="temperature">
    <th mat-header-cell *matHeaderCellDef> Temperatura </th>
    <td mat-cell *matCellDef="let row"> {{row.temperature}} </td>
  </ng-container>
  
  <!-- Humidity Column -->
  <ng-container matColumnDef="pressure">
    <th mat-header-cell *matHeaderCellDef> Pressione </th>
    <td mat-cell *matCellDef="let row"> {{row.pressure}} </td>
  </ng-container>

  <!-- Humidity Column -->
  <ng-container matColumnDef="humidity">
    <th mat-header-cell *matHeaderCellDef> Umidità </th>
    <td mat-cell *matCellDef="let row"> {{row.humidity}} </td>
  </ng-container>
  
  <!-- Wind Column -->
  <ng-container matColumnDef="wind">
    <th mat-header-cell *matHeaderCellDef> Vento </th>
    <td mat-cell *matCellDef="let row"> {{row.windSpeed}} </td>
  </ng-container>


  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
  
  `,
  styleUrl: './history-table.component.scss'
})

export class HistoryTableComponent { 

  @Input() dataSource!:any;
  displayedColumns: string[] = ['time', 'temperature','pressure', 'humidity', 'wind'];

}
