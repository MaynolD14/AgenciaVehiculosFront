import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Compras } from '../model/compras';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = `${environment.HOST}/compras`;
  constructor(private http: HttpClient) { }

  getCompras(): Observable<Compras[]> {
    return this.http.get<Compras[]>(this.url);
  }

  getComprasID(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.get<any>(urlById);
  }

  crearCompras(Compras: any): Observable<any> {
    return this.http.post<any>(this.url, Compras);
  }

  actualizarCompras(id: number, compras: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, compras);
  } 

  eliminarCompras(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }
}