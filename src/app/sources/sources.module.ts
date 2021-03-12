import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesListComponent } from './components/sources-list/sources-list.component';
import { SharedModule } from '../shared/shared.module';
import { GaSourceComponent } from './components/ga-source/ga-source.component';

@NgModule({
  declarations: [SourcesListComponent, GaSourceComponent],
  imports: [CommonModule, SourcesRoutingModule, SharedModule],
})
export class SourcesModule {}
