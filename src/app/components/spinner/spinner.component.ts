import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule, MatProgressBarModule
  ],
  template: `
  
  <p>Connessione in corso...</p>
  <mat-progress-bar mode="query"></mat-progress-bar>

  `,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent implements OnInit {

  ngOnInit(): void {

    

  }

}
