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
      MeteoMarso &copy; - All rights reserved 2024 - Alessandro Petriccone
       | Powered by
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
}
