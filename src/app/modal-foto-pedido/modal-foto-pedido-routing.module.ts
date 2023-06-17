import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFotoPedidoPage } from './modal-foto-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFotoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFotoPedidoPageRoutingModule {}
