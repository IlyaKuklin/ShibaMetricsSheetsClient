import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InfoSnackbarComponent } from '../components/info-snackbar/info-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(data: ISnackbarData) {
    const className = data.isError ? 'sm-snack-bar-error' : 'sm-snack-bar';

    this.snackBar.openFromComponent(InfoSnackbarComponent, {
      duration: data.duration,
      data: { body: data.message } as ISnackbarMessage,
      panelClass: [className],
    });
  }
}

export interface ISnackbarData {
  message: string;
  duration: number;
  isError?: boolean;
}

export interface ISnackbarMessage {
  body: string;
}
