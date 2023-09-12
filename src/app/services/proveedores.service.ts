import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proveedores } from '../model/proveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url = `${environment.HOST}/proveedores`;
  constructor(private http: HttpClient) { }

  getProveedores(): Observable<Proveedores[]> {
    return this.http.get<Proveedores[]>(this.url);
  }

  getProveedoresID(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.get<any>(urlById);
  }

  crearProveedor(proveedores: any): Observable<any> {
    return this.http.post<any>(this.url, proveedores);
  }

  actualizarProveedor(id: number, proveedores: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, proveedores);
  } 

  eliminarProveedor(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }


}
