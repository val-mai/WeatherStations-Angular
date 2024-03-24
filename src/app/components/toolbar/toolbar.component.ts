import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar
      color="primary"
      [class.transparent]="transparent"
      [ngClass]="{ scrolled: isScrolled }"
    >
      <div class="container">
        <button mat-button routerLink="/home">
          <div class="logo">
            <img src="assets/logo.png" alt="" />
            <h3 class="mx-3">MeteoMarso</h3>
          </div>
        </button>
        <span class="example-spacer"></span>
        <div *ngIf="mobile == false && comingSoon == false">
          <button routerLink="/map" routerLinkActive="active" mat-button>
            Mappa Live
          </button>
          <button mat-button routerLink="/stats" routerLinkActive="active">
            Statistiche
          </button>
          <button mat-button class="example-icon">Chi siamo</button>
        </div>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements AfterViewInit {
  constructor(private responsive: BreakpointObserver) {}

  @Input() transparent = false;
  mobile = false;
  comingSoon = environment.comingSoon;

  ngAfterViewInit(): void {
    this.responsive
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => {
        this.mobile = result.matches ? true : false;
      });
  }

  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    if (this.isScrolled) {
      this.transparent = false;
    }
  }
}
