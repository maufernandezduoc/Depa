import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  clave: string = '';

  constructor(private apiService: ApiServiceService,private toastController: ToastController, private router: Router) {}

  login() {
    // Llama al servicio para obtener la lista de empleados
    this.apiService.getEmpleado().subscribe((empleados: any[]) => {
      // Busca el empleado que coincide con el usuario ingresado
      const empleado = empleados.find((emp) => emp.usuario === this.usuario);

      if (empleado && empleado.clave === this.clave) {
        // Empleado encontrado y contraseña coincidente
        const rutEmpleado = empleado.rut;

        localStorage.setItem('session', 'true'); // Almacena el indicador de sesión iniciada
        localStorage.setItem('username', this.usuario); // Almacena el usuario como nombre de usuario
        localStorage.setItem('rutEmpleado', rutEmpleado); 
        this.mostrarNotificacion('Ingreso con éxito');// Almacena el rut del empleado
        this.router.navigate(['/tabs']);

      } else {
        console.log('Credenciales inválidas');
      }
    });
  }

  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
}

