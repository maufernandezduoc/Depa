import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiServiceService } from '../api-service.service';
import { formatDate } from '@angular/common';
import { IonItem, IonTextarea, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalFotoPedidoPage } from '../modal-foto-pedido/modal-foto-pedido.page';
import { GoogleDriveService } from '../google-drive.service';

import 'firebase/storage';
import { ToastController } from '@ionic/angular';




const username = localStorage.getItem('username');

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.page.html',
  styleUrls: ['./paquete.page.scss'],
})
export class PaquetePage implements OnInit {
  modal: HTMLIonModalElement | null = null;
  pedidoSeleccionado: any = null;
  segundaFoto: string | null = null;
  fotoPedido: string = '';
  capturedImageUri: string = '';
  capturedImage: string = '';
  segment: string = 'ingreso';
  selectedTorre: any;
  selectedDepartamento: any;
  torres: any[] = [];
  departamentos: any[] = [];
  edificios: any[] = []; 
  indicePedidoSeleccionado: number | null = null;


  departamentosFiltrados: any[] = [];
  mensaje: string = ''; 
  segmentoActual: string = 'ingreso';
  pedidosR: any[] = [];
  pedidoSeleccionadoIndex: number = -1;
  fotoVisible: boolean = false;
  imagenSeleccionada: string = '';
  nuevaFotoRetiro: string = '';
  username: string = '';
  retiroExitoso: boolean = false;
  capturedImage2: any;
  segmentoActuali: string = 'ingreso';
  pedidos: any[] = [];
  selectedPedido: any;
  selectedPedidoImage: string | null = null;
  @ViewChild('mensajeInput', { static: false }) mensajeInput!: IonTextarea;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    
    private apiService: ApiServiceService,
  ) {}

  ngOnInit() {
    this.actualizarListaPedidos();
    this.username = localStorage.getItem('username') ?? '';
  }
  
  

  cambiarSegmento(event: any) {
    this.segmentoActual = event.detail.value;
    
    if (this.segmentoActual === 'retiro') {
      this.actualizarListaPedidos();
    }
  }
  
  async capturePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Cambiar a Base64 para obtener la imagen en formato Base64
        source: CameraSource.Camera,
      });
  
      if (image.base64String) {
        this.capturedImageUri = 'data:image/jpeg;base64,' + image.base64String; // Asignar la imagen capturada en formato Base64 a capturedImageUri
  
        console.log('Imagen capturada:', this.capturedImageUri);
  
        // Resto del código de captura y registro...
      } else {
        console.log('La imagen capturada no se encuentra en formato Base64.');
      }
    } catch (error) {
      console.log(error);
    }
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
  
  seleccionarTorre(event: any) {
    this.selectedTorre = event.detail.value;
    console.log('Torre seleccionada:', this.selectedTorre);
    
    // Filtrar los departamentos según el edificio seleccionado
    this.departamentosFiltrados = this.departamentos.filter(depto => depto.id_edificio === this.selectedTorre);
    
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
  
  registrar() {
    // Obtener fotoComoTexto y otras variables necesarias
    const fotoComoTexto = this.capturedImageUri; // Utiliza la variable que contiene la URI de la imagen capturada
    const selectedTorre = this.selectedTorre;
    const selectedDepartamento = this.selectedDepartamento;
    const fechaActual = new Date();
    const fecha_recepcion = fechaActual.toISOString().slice(0, 19).replace('T', ' '); // Convierte la fecha a formato ISO
    const timestamp = new Date().getTime();
    const id_pedido = `PEDIDO_${timestamp}`;
    
    const rut_empleado = parseInt(localStorage.getItem('rutEmpleado') ?? '0', 10);
  
    // Crear el objeto con los datos a enviar a la API
    const pedido = {
      id_pedido: id_pedido,
      fecha_recepcion: fecha_recepcion,
      fecha_entrega: null, // Asigna null si no tienes un valor específico
      evidencia_recepcion: fotoComoTexto,
      evidencia_entrega: null,
      id_departamento: selectedDepartamento,
      id_edificio: selectedTorre,
      id_conjunto: 1,
      rut_empleado: rut_empleado,
      mensaje: this.mensajeInput && this.mensajeInput.value !== '' ? this.mensajeInput.value : null,
    };
  
    console.log('Datos a enviar:', pedido); // Imprime los datos a enviar a la API
  
    this.apiService.insertarPedido(pedido).subscribe(
      (response) => {
        console.log('Datos insertados correctamente:', response);
        // Realizar acciones adicionales después de que los datos se inserten correctamente
  
        // Limpiar los campos
        this.mensajeInput.value = null;
        this.selectedTorre = null;
        this.selectedDepartamento = null;
        this.capturedImageUri = ''; 
        this.mostrarNotificacion('Ingreso con éxito');// Restablece la variable de la URI de la imagen capturada
      },
      (error) => {
        console.error('Error al insertar los datos:', error);
        // Manejar el error de alguna manera
      }
    );
  }
  
  

  // ...

  verFotoPedido(pedido: any) {
    if (this.pedidoSeleccionado === pedido) {
      // Si el pedido ya estaba seleccionado, lo deseleccionamos
      this.pedidoSeleccionado = null;
    } else {
      // Si el pedido no estaba seleccionado, lo seleccionamos
      this.pedidoSeleccionado = pedido;
    }
  }
  async capturarFotoRetiro() {
    try {
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Cambiar a Base64 para obtener la imagen en formato Base64
        source: CameraSource.Camera,
      });
  
      if (image.base64String) {
        this.nuevaFotoRetiro = 'data:image/jpeg;base64,' + image.base64String; // Asignar la imagen capturada en formato Base64 a nuevaFotoRetiro
  
        console.log('Imagen capturada:', this.nuevaFotoRetiro);
  
        // Resto del código de captura y registro...
      } else {
        console.log('La imagen capturada no se encuentra en formato Base64.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async mostrarNotificacion(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  registrarRetiro() {
    if (!this.pedidoSeleccionado) {
      console.error('No se ha seleccionado ningún pedido');
      return;
    }
  
    const idPedido = this.pedidoSeleccionado.id_pedido;
    const nuevaFotoRetiro = this.nuevaFotoRetiro;
    const fechaActual = new Date();
    const fecha_entrega = fechaActual.toISOString().slice(0, 19).replace('T', ' '); // Convierte la fecha a formato ISO
    const rutEmpleado = parseInt(localStorage.getItem('rutEmpleado') || '0', 10);
  
    if (isNaN(rutEmpleado)) {
      console.error('El valor de rutEmpleado no es un número entero válido');
      return;
    }
  
    const pedido = {
      fecha_entrega: fecha_entrega,
      evidencia_entrega: nuevaFotoRetiro,
      rut_empleado_ent: rutEmpleado
    };
  
    const url = `ActualizarPedido/${idPedido}`;
  
    console.log('URL del pedido:', url);
    console.log('Datos del pedido:', pedido);
  
    this.apiService.actualizarPedido(idPedido, pedido).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        console.log('Pedido actualizado correctamente');
        this.retiroExitoso = true;
    if (this.retiroExitoso) {
      this.actualizarListaPedidos();
      this.mostrarNotificacion('Retiro con éxito');
      this.nuevaFotoRetiro = '';
    }
        // Realiza acciones adicionales después de actualizar el pedido
      },
      (error) => {
        console.error('Error al actualizar el pedido:', error);
        // Maneja el error de alguna manera
      }
    );

    
    
  }

  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    return formatDate(fechaObj, 'dd/MM/yyyy', 'en-US');
  }

  // Método para formatear la hora sin segundos
  formatearHora(hora: string): string {
    if (!hora) {
      return ''; // Manejar el caso de una hora vacía o inválida
    }
  
    const horaObj = new Date(hora);
    if (isNaN(horaObj.getTime())) {
      return ''; // Manejar el caso de una hora inválida que no se puede convertir en un objeto Date
    }
  
    return formatDate(horaObj, 'HH:mm', 'en-US');
  }
  
  separarFechaHora(fechaHora: string): { fecha: string, hora: string } {
    const [fecha, hora] = fechaHora.split(' ');
    return { fecha, hora };
  }
  
  
  
  
  
  
  
  mostrarFoto(pedido: any) {
    this.pedidoSeleccionado = pedido;
    this.fotoVisible = true;
  }
  



mostrarModalFotoPedido() {
  this.modalController.create({
    component: ModalFotoPedidoPage,
    componentProps: {
      pedido: this.selectedPedido,
      imagen: this.selectedPedidoImage
    }
  }).then(modal => {
    this.modal = modal;
    this.modal.present();
  });
}



base64toBlob(base64String: string) {
  const byteString = atob(base64String);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: 'image/jpeg' });
  return blob;
}


actualizarListaPedidos() {
  this.obtenerDepartamentos();
  this.apiService.obtenerPedidos().subscribe(
    (data) => {
      console.log('Datos de los pedidos:', data);
      this.pedidosR = data;
      console.log('Pedidos en pedidosR:', this.pedidosR);
    },
    (error) => {
      console.error('Error al obtener los pedidos:', error);
    }
  );
}

logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('session');
  this.mostrarNotificacion('Sesión cerrada');
  this.router.navigate(['/login']);
}



}
