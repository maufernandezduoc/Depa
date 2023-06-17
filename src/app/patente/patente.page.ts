import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patente',
  templateUrl: './patente.page.html',
  styleUrls: ['./patente.page.scss'],
})
export class PatentePage implements OnInit {
  username: string = ''; // Inicializar la propiedad directamente en la declaración

  constructor(private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('session');
    this.router.navigate(['/login']);
  }
}
