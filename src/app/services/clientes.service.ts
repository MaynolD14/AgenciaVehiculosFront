import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Clientes } from '../model/clientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private url = `${environment.HOST}/clientes`;
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(this.url);
  }

  getClienteID(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.get<any>(urlById);
  }

  crearCliente(clientes: any): Observable<any> {
    return this.http.post<any>(this.url, clientes);
  }

  actualizarCliente(id: number, clientes: any): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.put<any>(urlById, clientes);
  } 

  eliminarCliente(id: number): Observable<any> {
    const urlById = `${this.url}/${id}`;
    return this.http.delete<any>(urlById);
  }

}
