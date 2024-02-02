import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatDividerModule, FontAwesomeModule],
  template: `
  <div class="position mat-app-background">
    <mat-divider></mat-divider>
    <footer>
      @if (mobile == false) {
        <a href="/admin">MeteoMarso &copy;</a> - <span *ngIf="mobile==false">All rights reserved 2024 -</span> Alessandro Petriccone
         | Powered by
        }
        @else {
          <a href="/admin">MeteoMarso &copy;</a> - 2024 - A. Petriccone | Powered by
        }
        <a href="https://www.linkedin.com/in/valerio-maiolini/" target="_blank">
          <fa-icon class="icon" [icon]="faLinkedin"></fa-icon>
        </a>
      </footer>
  </div>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  faLinkedin = faLinkedin;
  mobile = false;

  constructor(private responsive: BreakpointObserver) { }

  ngAfterViewInit(): void {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
      this.mobile = (result.matches) ? true : false;
    });
  }

}
