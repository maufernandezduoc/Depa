import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-patente',
  templateUrl: './patente.page.html',
  styleUrls: ['./patente.page.scss'],
})
export class PatentePage implements OnInit {
  username: string = '';
  patente: any = '';
  vehiculo: any;
  vehiculoVisita: any;
  mensajeNoEncontrado: string = '';
  mostrarBotonVisita: boolean = false;
  rutV: string = '';
  dvV: string = '';
  nombreV: string = '';
  apellidoV: string = '';
  mostrarMensaje = false;
  opcionSeleccionadaV: any = '';
  selectedTorreV: any;
  selectedDepartamentoV: any;
  

  constructor(
    private router: Router,
    private toastController: ToastController,
    private apiService: ApiServiceService
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
    const patenteFormatted = this.patente.toUpperCase().replace(/-/g, '').replace(/_/g, '');
  
    if (patenteFormatted.trim() === '') {
      // Resto del código cuando patenteFormatted está vacío o contiene solo espacios en blanco
    } else {
      this.apiService.buscarVehiculo(patenteFormatted).subscribe(
        (data: any) => {
          this.vehiculo = data;
  
          if (!this.vehiculo) {
            this.apiService.buscarEnVisitas(patenteFormatted).subscribe(
              (dataVisita: any) => {
                this.vehiculoVisita = dataVisita;
  
                if (!this.vehiculoVisita) {
                  this.mostrarMensaje = true;
                } else {
                  this.mostrarMensaje = false;
                }
              },
              (errorVisita: any) => {
                this.mostrarMensaje = true;
              }
            );
          } else {
            this.mostrarMensaje = false;
          }
        },
        (error: any) => {
          // Resto del código cuando la búsqueda de vehículo falla
  
          this.apiService.buscarEnVisitas(patenteFormatted).subscribe(
            (dataVisita: any) => {
              this.vehiculoVisita = dataVisita;
              // Resto del código después de buscarEnVisitas en caso de que la búsqueda de vehículo falle
  
              if (!this.vehiculoVisita) {
                this.mostrarMensaje = true;
              } else {
                this.mostrarMensaje = false;
              }
            },
            (errorVisita: any) => {
              this.mostrarMensaje = true;
            }
          );
        }
      );
    }
  }
  
  convertirAMayusculas() {
    this.patente = this.patente.toUpperCase();
  }

  realizarSalida() {
    const idEstacionamiento = this.vehiculoVisita.id_est;
    const nuevoEstado = 0;
  
    this.apiService.actualizarEstacionamiento(idEstacionamiento, nuevoEstado).subscribe(
      (response) => {
        console.log('Estado actualizado exitosamente:', response);
        this.actualizarFechaSal(); // Llama a la función actualizarFechaSal después de actualizar el estado
      },
      (error) => {
        console.error('Error al actualizar el estado:', error);
      }
    );
  }

  agregarComoVisitaSoloPatente() {
    if (this.patente) {
      console.log('Agregado como visita solo patente');
      this.router.navigate(['/tabs/tabs/visita'], { queryParams: { patente: this.patente } });
    }
  }

  agregarComoVisita() {
    console.log("Agregado como visita");
  
    const dvVisita = this.vehiculoVisita.dv_visita || ''; // Asignar cadena vacía si dv_visita es null o undefined
  
    const visitaData: any = {
      rutV: this.vehiculoVisita.rut_visita,
      dvV: this.vehiculoVisita.dv,
      nombreV: this.vehiculoVisita.nombre,
      apellidoV: this.vehiculoVisita.apellido,
      selectedDepartamentoV: this.vehiculoVisita.id_departamento,
      selectedTorreV: this.vehiculoVisita.id_edificio,
      opcionSeleccionadaV: this.vehiculoVisita.id_est,
      patente: this.patente
    };
  
    const navigationExtras: NavigationExtras = {
      state: {
        visitaData: visitaData
      }
    };
  
    this.router.navigate(['/tabs/tabs/visita'], navigationExtras);
  }

  actualizarFechaSal() {
    const patente = this.vehiculoVisita.patente;
    const fechaActual = new Date();
    const nuevaFechaSal = this.obtenerFechaHoraLocal(fechaActual);
    

    this.apiService.actualizarFechaSal(patente, nuevaFechaSal)
      .subscribe(
        response => {
          console.log('La fecha de salida se modificó correctamente');
          this.recargarPagina();
          this.mostrarNotificacion('Salida registrada de la patente: ' + patente + '');
          
        },
        error => {
          console.error('Error al modificar la fecha de salida:', error);
        }
      );
  }

  obtenerFechaHoraLocal(fecha: Date): string {
    const fechaLocal = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000));
    return fechaLocal.toISOString().slice(0, 19).replace('T', ' ');
  }
  ionViewDidEnter() {
    this.limpiarCampos();
  }
  limpiarCampos() {
    this.patente = ''; // Limpia el campo de la patente
    this.vehiculo = undefined; // Reinicia el objeto del vehículo
    this.vehiculoVisita = undefined; // Reinicia el objeto del vehículo visita
    this.mostrarMensaje = false; // Oculta el mensaje de vehículo no encontrado
  }
  recargarPagina() {
    window.location.reload();
  }
}
