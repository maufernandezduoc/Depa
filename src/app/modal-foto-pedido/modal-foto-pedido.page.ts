import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-foto-pedido',
  templateUrl: 'modal-foto-pedido.page.html',
  styleUrls: ['modal-foto-pedido.page.scss']
})
export class ModalFotoPedidoPage {
  @Input() foto: string = '';


  constructor(private modalController: ModalController) {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}
