import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoalbaranModalPage } from './infoalbaran-modal.page';

const routes: Routes = [
  {
    path: '',
    component: InfoalbaranModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoalbaranModalPageRoutingModule {}
