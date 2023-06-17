import { Component, OnInit, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ApiServiceService } from '../api-service.service';
import axios from 'axios';
import { IonTextarea, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModalFotoPedidoPage } from '../modal-foto-pedido/modal-foto-pedido.page';

import 'firebase/storage';





const username = localStorage.getItem('username');

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.page.html',
  styleUrls: ['./paquete.page.scss'],
})
export class PaquetePage implements OnInit {
  modal: HTMLIonModalElement | null = null;

  fotoPedido: string = '';

  capturedImage: string = '';
  segment: string = 'ingreso';
  selectedTorre: any;
  selectedDepartamento: any;
  torres: any[] = [];
  departamentos: any[] = [];
  edificios: any[] = []; 
  departamentosFiltrados: any[] = [];
  mensaje: string = ''; 
  segmentoActual: string = 'ingreso';
  pedidosR: any[] = [];

  capturedImage2: any;
  segmentoActuali: string = 'ingreso';
  pedidos: any[] = [];
  selectedPedido: any;
  selectedPedidoImage: string | null = null;
  @ViewChild('mensajeInput', { static: false }) mensajeInput!: IonTextarea;


  constructor(
    private apiService: ApiServiceService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
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
  
  cambiarSegmento(event: any) {
    this.segmentoActual = event.detail.value;
  }
  
  async capturePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 10,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });
  
      if (image.webPath) {
        const capturedImageUri = image.webPath;
        console.log(capturedImageUri);
  
        // Genera un nombre de archivo único para la imagen
        const fileName = `${new Date().getTime()}.jpg`;
  
       
  
        
        console.log('Imagen subida exitosamente a Firebase Storage.');
      } else {
        console.log('La URI de la imagen capturada es indefinida.');
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
    if (this.mensajeInput && this.mensajeInput.value) {
      this.mensaje = this.mensajeInput.value; // Asigna el valor del campo de texto a la variable mensaje
      console.log('Mensaje:', this.mensaje); // Imprime el mensaje guardado en la variable
  
      // Obtener fotoComoTexto y otras variables necesarias
      const fotoComoTexto = this.capturedImage; // Utiliza la variable "capturedImage" en lugar de una variable desconocida
      const selectedTorre = this.selectedTorre;
      const selectedDepartamento = this.selectedDepartamento;
      const fechaActual = new Date();
      const fecha_recepcion = fechaActual.toISOString().slice(0, 19).replace('T', ' '); // Convierte la fecha a formato ISO
      const timestamp = new Date().getTime();
      const id_pedido = `PEDIDO_${timestamp}`;
      // Crear el objeto con los datos a enviar a la API
      const pedido = {
        id_pedido: id_pedido,
        fecha_recepcion: fecha_recepcion,
        fecha_entrega: null, // Asigna null si no tienes un valor específico
        evidencia_recepcion: fotoComoTexto,
        evidencia_entrega: "link_entrega",
        id_departamento: selectedDepartamento,
        id_edificio: selectedTorre,
        id_conjunto: 1,
        rut_empleado: 18093433,
        mensaje: this.mensaje,
      };
  
      this.apiService.insertarPedido(pedido).subscribe(
        (response) => {
          console.log('Datos insertados correctamente:', response);
          // Realizar acciones adicionales después de que los datos se inserten correctamente
          
          // Limpiar los campos
          this.mensajeInput.value = '';
          this.selectedTorre = null;
          this.selectedDepartamento = null;
          this.capturedImage = '';
        },
        (error) => {
          console.error('Error al insertar los datos:', error);
          // Manejar el error de alguna manera
        }
      );
    } else {
      console.log('El campo de mensaje está vacío');
    }
  }
  
  async verFotoPedido(pedido: any) {
    // Aquí asumes que `pedido` tiene una propiedad `urlFoto` que contiene la URL de la foto
    this.fotoPedido = pedido.urlFoto;
  
    console.log('URL de la foto:', this.fotoPedido);
  
    const modal = await this.modalController.create({
      component: ModalFotoPedidoPage,
      componentProps: {
        foto: this.fotoPedido
      }
    });
  
    console.log('Modal creado:', modal);
  
    await modal.present();
    console.log('Modal presentado');
  }
  
  
  
  
  
  capturarFoto() {
    // Aquí puedes implementar la lógica para capturar una nueva foto del pedido
    console.log('Capturar nueva foto del pedido');
  }
  
  
}
