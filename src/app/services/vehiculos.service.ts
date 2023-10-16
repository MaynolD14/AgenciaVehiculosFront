import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
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

  crearVehiculo(vehiculo: any): Observable<any> {
    return this.http.post<any>(this.url, vehiculo);
  }

  actualizarVehiculo(id: number, vehiculo: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, vehiculo);
  } 

  eliminarVehiculo(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }

  actualizarStockVehiculo(id_vehiculo: number, cantidadComprada: number): Observable<any> {
    const urlToUpdateStock = `${this.url}/actualizarStock/${id_vehiculo}`;
    const params = new HttpParams().set('cantidad_comprada', cantidadComprada.toString());
  
    return this.http.put<any>(urlToUpdateStock, null, { params });
  }
  
}
