import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service'; // Reemplaza con la ruta correcta

@Component({
  selector: 'app-patente',
  templateUrl: './patente.page.html',
  styleUrls: ['./patente.page.scss'],
})
export class PatentePage implements OnInit {
  username: string = '';
  patente: string = '';
  vehiculo: any;
  mensajeNoEncontrado: string = '';
  mostrarBotonVisita: boolean = false;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiServiceService // Agrega el servicio ApiServiceService
  ) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('session');
    this.mostrarNotificacion('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  buscar() {
    // Convertir la patente a mayúsculas y eliminar los guiones
    const patenteFormatted = this.patente.toUpperCase().replace(/-/g, '').replace(/_/g, '');

    // Verificar si se ha ingresado una patente válida
    if (patenteFormatted.trim() === '') {
      // Patente no válida
      this.vehiculo = null;
      this.mensajeNoEncontrado = 'Ingrese una patente válida.';
      this.mostrarBotonVisita = false; // Oculta el botón
    } else {
      // Realizar la búsqueda de la patente
      this.apiService.buscarVehiculo(patenteFormatted).subscribe(
        (data: any) => {
          this.vehiculo = data;
          this.mensajeNoEncontrado = '';
          this.mostrarBotonVisita = false; // Oculta el botón
        },
        (error: any) => {
          this.vehiculo = null;
          this.mensajeNoEncontrado = 'Vehículo no encontrado en el condominio';
          this.mostrarBotonVisita = true; // Muestra el botón
        }
      );
    }
  }

  convertirAMayusculas() {
    this.patente = this.patente.toUpperCase();
  }

  agregarComoVisita() {
    this.router.navigate(['/tabs/tabs/visita'], { queryParams: { patente: this.patente } });
  }
}
