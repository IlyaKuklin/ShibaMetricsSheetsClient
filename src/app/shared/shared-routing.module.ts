import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevTestComponent } from './components/dev-test/dev-test.component';

const routes: Routes = [
  {
    path: 'test',
    component: DevTestComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
