import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFotoPedidoPage } from './modal-foto-pedido.page';

describe('ModalFotoPedidoPage', () => {
  let component: ModalFotoPedidoPage;
  let fixture: ComponentFixture<ModalFotoPedidoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalFotoPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
