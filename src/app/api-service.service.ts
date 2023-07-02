import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private API_URL = 'http://192.168.100.40:3000'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getPatentes() {
    return this.http.get(`${this.API_URL}/TraerPatente`);
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
  getEmpleado(): Observable<any> {
    return this.http.get(`${this.API_URL}/TraerEmpleado`);
  }
  
  actualizarPedido(id: string, nuevosDatos: any): Observable<any> {
    const url = `${this.API_URL}/ActualizarPedido/${id}`;
    return this.http.put(url, nuevosDatos);
  }
  
  getEstacionamiento(): Observable<any> {
    return this.http.get(`${this.API_URL}/ObtenerEstacionamientos`);
  }
  
  insertarVisita(visita: any): Observable<any> {
    return this.http.post(`${this.API_URL}/GuardarVisita`, visita);
  }
  
  buscarEnVisitas(patente: string) {
    return this.http.get(`${this.API_URL}/buscarEnVisitas?patente=${patente}`);
  }
  buscarVehiculo(patente: string) {
    return this.http.get(`${this.API_URL}/buscarVehiculo?patente=${patente}`);
  }

  actualizarEstacionamiento(id: string, nuevoEstado: number): Observable<any> {
    const url = `${this.API_URL}/estacionamiento/${id}`;
    return this.http.put(url, { estado: nuevoEstado });
  }

  actualizarFechaSal(patente: string, nuevaFechaSal: string): Observable<any> {
    const url = `${this.API_URL}/modificarFechaSal`;
    return this.http.put(url, { patente, nuevaFechaSal });
  }

  

  // Agrega los demás métodos para interactuar con la API según tus necesidades
}
