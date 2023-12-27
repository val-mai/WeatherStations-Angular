import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule,MatCardModule, FontAwesomeModule],
  template: `
    <mat-card class="card container">
      <fa-icon class="icon my-4" [style]="{display: 'inline-block', padding: '5px'}" [icon]="content.icon" size="3x"></fa-icon>
      <mat-card-title>
        <h4>{{ content.title }}</h4>
      </mat-card-title>
      <mat-card-content>
        <p>{{ content.description }}</p>
      </mat-card-content>
      <mat-card-actions>

      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './feature-card.component.scss',
})
export class FeatureCardComponent {
  @Input() content:any;
}
