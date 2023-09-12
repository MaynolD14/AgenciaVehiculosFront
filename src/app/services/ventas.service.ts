import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Clientes } from '../model/clientes';
import { Observable } from 'rxjs';
import { Ventas } from '../model/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private url = `${environment.HOST}/ventas`;
  constructor(private http: HttpClient) { }

  getVentas(): Observable<Ventas[]> {
    return this.http.get<Ventas[]>(this.url);
  }

  getVentasID(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.get<any>(urlById);
  }

  crearVentas(ventas: any): Observable<any> {
    return this.http.post<any>(this.url, ventas);
  }

  actualizarVentas(id: number, ventas: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, ventas);
  } 

  eliminarVentas(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }
}
