import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';



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
  username: string = '';
  dataEst: any[] = [];
  opcionSeleccionada: any = '';
  rut: string = '';
  nombreV: string = '';
  apellidoV: string = '';





  constructor(private activatedRoute: ActivatedRoute,private apiService: ApiServiceService, private router: Router,private toastController: ToastController) { }

  ngOnInit() {
    this.loadData();
    
    this.username = localStorage.getItem('username') ?? '';
    this.obtenerDepartamentos();
    this.activatedRoute.queryParams.subscribe(params => {
      this.patente = params['patente'];
    });
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
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('session');
    this.mostrarNotificacion('Sesión cerrada');
    this.router.navigate(['/login']);
  }
  seleccionarEstacionamiento(event: any) {
    this.opcionSeleccionada = event.detail.value;
    console.log('Opción seleccionada:', this.opcionSeleccionada);
    // Aquí puedes realizar acciones adicionales con la opción seleccionada
  }

  registrar() {
    const rut = this.rut.split('-')[0];
    const dv = this.rut.split('-')[1].toUpperCase();
    const fechaActual = new Date();
    const fecha_entrega = this.obtenerFechaHoraLocal(fechaActual);
    
    const visita = {
      rut_visita: rut,
      dv: dv,
      nombre: this.nombreV,
      apellido: this.apellidoV,
      patente: this.patente? this.patente : null,
      id_est: this.opcionSeleccionada ? this.opcionSeleccionada : null,
      id_departamento: this.selectedDepartamento,
      id_edificio: this.selectedTorre,
      id_conjunto: 1,
      fecha_ing: fecha_entrega,
      fecha_sal: null
    };
  
    // Llama al método insertarVisita del servicio ApiServiceService
    this.apiService.insertarVisita(visita).subscribe(
      (response) => {
        console.log('Visita guardada con éxito:', response);
        this.limpiarFormulario();
        this.mostrarNotificacion('Visita guardada con éxito');
      },
      (error) => {
        console.error('Error al guardar la visita:', error);
        this.mostrarNotificacion('Error al guardar la visita');
      }
    );
  }

  obtenerFechaHoraLocal(fecha: Date): string {
    const fechaLocal = new Date(fecha.getTime() - (fecha.getTimezoneOffset() * 60000));
    return fechaLocal.toISOString().slice(0, 19).replace('T', ' ');
  }

  validarRutDV(rut: string = ''): boolean {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
      return false; // El formato del Rut es incorrecto
    }
  
    const rutDigits = rut.split('-')[0]; // Obtener los dígitos del Rut
    const dv = rut.split('-')[1].toUpperCase(); // Obtener el dígito verificador y convertirlo a mayúsculas
    const rutNumbers = Array.from(rutDigits).reverse().map(Number); // Convertir los dígitos del Rut a un array y revertir el orden
    const factor = [2, 3, 4, 5, 6, 7, 2, 3]; // Factor para el cálculo del dígito verificador
  
    let sum = 0;
    for (let i = 0; i < rutNumbers.length; i++) {
      sum += rutNumbers[i] * factor[i % 8];
    }
  
    const expectedDV = 11 - (sum % 11); // Calcular el dígito verificador esperado
    const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : String(expectedDV); // Obtener el dígito verificador calculado
  
    return dv === calculatedDV; // Comparar el dígito verificador ingresado con el calculado
  }

  limpiarFormulario() {
    this.rut = '';
    this.nombreV = '';
    this.apellidoV = '';
    this.selectedTorre = null;
    this.selectedDepartamento = null;
    this.patente = '';
    this.opcionSeleccionada = '';
  }
  
  
  

}
