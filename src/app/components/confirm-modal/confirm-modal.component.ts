import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h1 class="mb-3" mat-dialog-title>{{ title }}</h1>
    <div class="my-3" mat-dialog-content>
      {{ message }}
    </div>
    <mat-dialog-actions align="end">
      <button
        mat-stroked-button
        color="warn"
        mat-dialog-close
        (click)="dialogRef.close(false)"
      >
        Annulla
      </button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">
        Conferma
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  title: string;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ConfirmDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;
  }
}

export class ConfirmDialogModel {
  constructor(public title: string, public message: string) {}
}
