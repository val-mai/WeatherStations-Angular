import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary" [class.transparent]="transparent">
      <div class="container">
        <button mat-button routerLink="/home">
          <div class="logo">
            <img src="assets/logo.png" alt="">
            <h3 class="mx-3">MeteoMarso</h3>
          </div>
        </button>
        <span class="example-spacer"></span>
        <button routerLink="/map" routerLinkActive="active" mat-button class="example-icon">
          Mappa Live
        </button>
        <button mat-button class="example-icon favorite-icon">
          Statistiche
        </button>
        <button mat-button class="example-icon">
          Chi siamo
        </button>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {

  @Input() transparent = false;

}
