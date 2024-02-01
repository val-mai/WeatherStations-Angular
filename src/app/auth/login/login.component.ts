import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
  <div class="main">
    <div [formGroup]="loginForm" class="form">
      <img class="my-3" src="../../assets/logo.png" style="width: 60px;" alt="">
      <h3>Email:</h3>
      <mat-form-field class="col-md-3" color="accent" appearance="outline">
        <input type="email" matInput formControlName="email" />
      </mat-form-field>
      <h3>Password:</h3>
      <mat-form-field class="col-md-3" color="accent" appearance="outline">
        <input type="password" matInput formControlName="password" />
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="login()">Login</button>
    </div>
  </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl("/admin");
      },
      error: () => console.log('Error'),
    });
  }
}
