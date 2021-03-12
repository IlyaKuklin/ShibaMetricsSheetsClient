import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/api/rest/api';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SourcesListComponent } from './components/sources-list/sources-list.component';

const routes: Routes = [
  {
    path: 'clients/:clientId/sources',
    component: SourcesListComponent,
    canActivate: [RolesGuard],
    data: { roles: [Role.Administrator, Role.Marketer] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SourcesRoutingModule {}
