import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snackbar: MatSnackBar) { }

  private createSnack(message: string, action: string, type:string, duration:number) {
    this.snackbar.open(message, action, {
      panelClass: type,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration
    });
  }

  warning(message: string, action: string) {
    this.createSnack(message, action, 'error-snackbar', 2000);
  }

  success(message:string, action:string) {
    this.createSnack(message, action, 'success-snackbar', 1000);
  }
}
