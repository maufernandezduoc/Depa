import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getPatentes() {
    return this.http.get(`${this.API_URL}/TraerPatente`);
  }

  buscarVehiculo(patente: string) {
    return this.http.get(`${this.API_URL}/buscarVehiculo?patente=${patente}`);
  }

  getCorreosElectronicosDepartamento(id: string) {
    return this.http.get(`${this.API_URL}/departamentos/${id}/persona`);
  }

  insertarPedido(pedido: any) {
    return this.http.post(`${this.API_URL}/InsertarPedido`, pedido);
  }

  obtenerPedidos(): Observable<any> {
    return this.http.get(`${this.API_URL}/ObtenerPedidos`);
  }
  
  getDepartamentos(): Observable<any> {
    return this.http.get(`${this.API_URL}/TraerDepartamento`);
  }
 

  

  // Agrega los demás métodos para interactuar con la API según tus necesidades
}
