import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-top-stats-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z8 mb-4">
      <ng-container matColumnDef="stationId">
        <th class="name" mat-header-cell *matHeaderCellDef>Stazione</th>
        <td mat-cell *matCellDef="let row">
          <a href="stations/{{ row.device.id }}">{{ row.device.name }}</a>
        </td>
      </ng-container>

      <ng-container matColumnDef="value">
        <th class="value" mat-header-cell *matHeaderCellDef>Valore</th>
        <td mat-cell *matCellDef="let row">
          {{ row.historyMetric.value }} {{ unit }}
        </td>
      </ng-container>

      <ng-container matColumnDef="time">
        <th class="value" mat-header-cell *matHeaderCellDef>Data e ora</th>
        <td mat-cell *matCellDef="let row">
          {{ row.historyMetric.time * 1000 | date : 'HH:mm' }}
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  styleUrl: './top-stats-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopStatsTableComponent {
  @Input() data!: any;
  @Input() unit!: string;
  displayedColumns: string[] = ['stationId', 'value', 'time'];
}
