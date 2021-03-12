import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
}

export interface ISelectOptionDialogData {
  header: string;
  options: string[];
}
