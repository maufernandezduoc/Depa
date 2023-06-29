import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private API_URL = 'https://maufernandezduoc-orange-broccoli-45q6459xgrjhjvrv-3000.preview.app.github.dev'; // Reemplaza con la URL de tu API

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
  
  
  

  // Agrega los demás métodos para interactuar con la API según tus necesidades
}
