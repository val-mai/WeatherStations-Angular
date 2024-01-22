import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule
  ],
  template: `
  <mat-toolbar color="primary">
      <div class="container">
        <button mat-button routerLink="/admin">
          <div class="logo">
            <img src="assets/logo.png" alt="">
            <h3 class="mx-3">Admin Dashboard</h3>
          </div>
        </button>
        <span class="example-spacer"></span>
        <button routerLink="/admin" routerLinkActive="active" mat-button class="example-icon">
          Lista Stazioni
        </button>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './admin-toolbar.component.scss'
})

export class AdminToolbarComponent { }
