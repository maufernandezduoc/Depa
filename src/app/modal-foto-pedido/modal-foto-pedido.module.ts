import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFotoPedidoPageRoutingModule } from './modal-foto-pedido-routing.module';

import { ModalFotoPedidoPage } from './modal-foto-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFotoPedidoPageRoutingModule
  ],
  declarations: [ModalFotoPedidoPage]
})
export class ModalFotoPedidoPageModule {}
