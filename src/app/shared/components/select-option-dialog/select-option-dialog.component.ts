import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISelectOptionDialogData } from '../../services/dialog.service';

@Component({
  selector: 'sm-select-option-dialog',
  templateUrl: './select-option-dialog.component.html',
  styleUrls: ['./select-option-dialog.component.scss'],
})
export class SelectOptionDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ISelectOptionDialogData) {}

  ngOnInit(): void {
    this.selectedOption = this.data.options[0];
  }

  selectedOption: string;
}
