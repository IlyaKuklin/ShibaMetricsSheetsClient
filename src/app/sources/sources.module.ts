import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesListComponent } from './components/sources-list/sources-list.component';
import { SharedModule } from '../shared/shared.module';
import { GaSourceComponent } from './components/ga-source/ga-source.component';
import { YdSourceComponent } from './components/yd-source/yd-source.component';
import { SourceFilterComponent } from './components/source-filter/source-filter.component';

@NgModule({
	declarations: [ SourcesListComponent, GaSourceComponent, YdSourceComponent, SourceFilterComponent ],
	imports: [ CommonModule, SourcesRoutingModule, SharedModule ]
})
export class SourcesModule {}
