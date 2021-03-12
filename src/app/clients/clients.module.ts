import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { CreateUpdateClientComponent } from './components/create-update-client/create-update-client.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ClientsListComponent, CreateUpdateClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule],
})
export class ClientsModule {}
