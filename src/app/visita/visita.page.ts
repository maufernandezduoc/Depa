import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {
  patente: string = '';
  departamentosFiltrados: any[] = [];
  selectedTorre: any;
  selectedDepartamento: any;
  departamentos: any[] = [];
  edificios: any[] = []; 

  constructor(private activatedRoute: ActivatedRoute,private apiService: ApiServiceService, private router: Router,private toastController: ToastController) { }

  ngOnInit() {
    this.obtenerDepartamentos();
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

  seleccionarTorre(event: any) {
    this.selectedTorre = event.detail.value;
    console.log('Torre seleccionada:', this.selectedTorre);
  
    if (!this.selectedTorre) {
      // No se ha seleccionado ninguna torre, mostrar todos los departamentos sin filtro
      this.departamentosFiltrados = [...this.departamentos];
    } else {
      // Filtrar los departamentos según el edificio seleccionado
      this.departamentosFiltrados = this.departamentos.filter(depto => depto.id_edificio === this.selectedTorre);
    }
  
    // Agregar la propiedad 'nombre_departamento' en los objetos filtrados
    this.departamentosFiltrados = this.departamentosFiltrados.map(depto => {
      return {
        ...depto,
        nombre_departamento: `Dep. ${depto.id_departamento}` // Puedes ajustar el formato del nombre del departamento según tus necesidades
      };
    });
  }
  
  
  
  
  

  seleccionarDepartamento(event: any) {
    this.selectedDepartamento = event.detail.value;
    console.log('Departamento seleccionado:', this.selectedDepartamento);
  }
  obtenerDepartamentos() {
    this.apiService.getDepartamentos().subscribe(
      (response) => {
        this.departamentos = response;
        this.edificios = [...new Set(response.map((depto: { id_edificio: any; }) => depto.id_edificio))]
          .map((id_edificio) => {
            return {
              id_edificio: id_edificio,
              nombre_edificio: `Torre ${id_edificio}` // Puedes ajustar el formato del nombre del edificio según tus necesidades
            };
          });
      },
      (error) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }
  

}
