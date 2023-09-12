import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Clientes } from '../model/clientes';
import { Observable } from 'rxjs';
import { Vehiculos } from '../model/vehiculos';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private url = `${environment.HOST}/vehiculos`;
  constructor(private http: HttpClient) { }

  getVehiculos(): Observable<Vehiculos[]> {
    return this.http.get<Vehiculos[]>(this.url);
  }

  getVehiculoID(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.get<any>(urlById);
  }

  crearVehiculo(vehiculos: any): Observable<any> {
    return this.http.post<any>(this.url, vehiculos);
  }

  actualizarVehiculo(id: number, vehiculos: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, vehiculos);
  } 

  eliminarVehiculo(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }
}
