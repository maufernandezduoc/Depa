import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatentePage } from './patente.page';

const routes: Routes = [
  {
    path: '',
    component: PatentePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatentePageRoutingModule {}
