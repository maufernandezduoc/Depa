import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface Button {
  label: string;
  title: string;
  count?: number;
  type: string;
  color: string;
  state: string;
}

@Component({
  selector: 'app-estacionamiento',
  templateUrl: './estacionamiento.page.html',
  styleUrls: ['./estacionamiento.page.scss'],
})
export class EstacionamientoPage implements OnInit {
  dataEst: any[] = [];
  username: string = '';

  constructor(private router: Router,
    private toastController: ToastController,private apiService: ApiServiceService) {}

  ngOnInit() {
    this.loadData();
    this.username = localStorage.getItem('username') ?? '';
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    this.apiService.getEstacionamiento().subscribe(
      (response: any[]) => {
        console.log(response);
        this.dataEst = response;
        console.log(this.dataEst);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getUniqueTipoEst(): string[] {
    const uniqueTipoEst = Array.from(new Set(this.dataEst.map(estacionamiento => estacionamiento.tipo_est)));
    return uniqueTipoEst;
  }
  
  getEstacionamientosByTipoEst(tipoEst: string): any[] {
    return this.dataEst.filter(estacionamiento => estacionamiento.tipo_est === tipoEst);
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
}
