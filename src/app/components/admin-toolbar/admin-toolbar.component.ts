import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, FontAwesomeModule
  ],
  template: `
  <mat-toolbar color="primary">
      <div class="container">
        <div class="logo">
            <button mat-button routerLink="/home">
              <img src="assets/logo.png" alt="">
            </button>
            <h4 class="mx-3">Dashboard di {{name}}</h4>
          </div>
        <span class="example-spacer"></span>
        <button routerLink="/admin" routerLinkActive="active" mat-button class="example-icon">
          Lista Stazioni
        </button>
        <button mat-button class="example-icon" color="warn" (click)="logout()">
          <fa-icon size="lg" [icon]="faRightFromBracket"></fa-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styleUrl: './admin-toolbar.component.scss'
})

export class AdminToolbarComponent implements OnInit {

  faRightFromBracket = faRightFromBracket;
  name!:string;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.getToken();
  }

  logout() {
    this.authService.logout();
  }

  getToken(){
    const json = localStorage.getItem(`${environment.localStorage}`);
    if (json) {
      const user = JSON.parse(json);
      if (user.info.role=="ROLE_ADMIN") {
        this.name = user.info.firstName;
      }
    }
  }
    
 }
