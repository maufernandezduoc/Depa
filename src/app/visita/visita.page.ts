import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  patente: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router,private toastController: ToastController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.patente = params['patente'];
    });
  }

  registrar() {
    // Realiza la lógica de registro aquí
    // Puedes acceder a los valores ingresados utilizando las propiedades del componente
    console.log('Patente:', this.patente);
    this.mostrarNotificacion('Ingreso con éxito');
    // ...
    // Después de completar el registro, navega a otra página
    this.router.navigate(['/otra-pagina']);
  }

  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}
