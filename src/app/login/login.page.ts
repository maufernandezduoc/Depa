import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
password: string = '';


  constructor(private router: Router) {}

  login() {
    // Aquí puedes agregar la lógica de autenticación
    // por ejemplo, llamar a un servicio de autenticación
    // y redirigir al usuario a la página principal si el inicio de sesión es exitoso
    if (this.email === 'mauro@mauro.cl' && this.password === 'mauro123') {
      localStorage.setItem('session', 'true'); // Almacena el indicador de sesión iniciada
      localStorage.setItem('username', this.email); // Almacena el nombre de usuario
      this.router.navigate(['/tabs']);
    } else {
      console.log('Credenciales inválidas');
    }
  }
  
  
}






