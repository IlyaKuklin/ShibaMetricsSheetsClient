import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ISnackbarMessage } from '../../services/snackbar.service';

@Component({
  selector: 'sm-info-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.scss'],
})
export class InfoSnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ISnackbarMessage) {}

  ngOnInit(): void {}
}
