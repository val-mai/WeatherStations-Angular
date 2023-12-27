import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatDividerModule, FontAwesomeModule],
  template: `
  <div class="position">
    <mat-divider></mat-divider>
    <footer>
      MeteoMarso &copy; - All rights reserved 2024 - Alessandro Petriccone
       | Powered by
      <a href="https://github.com/val-mai" target="_blank">
        <fa-icon class="icon" [icon]="faGitHub"></fa-icon>
      </a>
    </footer>
  </div>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faGitHub = faGithub;
}
