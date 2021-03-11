import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedRoutingModule } from './shared-routing.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NgSelect2Module } from 'ng-select2';
import { DevTestComponent } from './components/dev-test/dev-test.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [DevTestComponent, ToolbarComponent, LoaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule
  ],
  exports: [
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatTableModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,

    NgSelect2Module,

    FormsModule,
    ReactiveFormsModule,

    ToolbarComponent,
    LoaderComponent
  ],
})
export class SharedModule {}
