import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { SelectOptionDialogComponent } from '../components/select-option-dialog/select-option-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}
  selectOptionDialog(data: ISelectOptionDialogData): Observable<any> {
    const dialogRef = this.dialog.open(SelectOptionDialogComponent, {
      data: data,
    });
    return dialogRef.afterClosed();
  }

  confirmDialog(data: IConfirmDialogData): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: data,
    });
    return dialogRef.afterClosed();
  }
}

export interface ISelectOptionDialogData {
  header: string;
  options: string[];
}

export interface IConfirmDialogData {
  header: string;
  message: string;
}
