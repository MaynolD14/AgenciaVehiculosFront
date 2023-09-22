import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Clientes } from 'src/app/model/clientes';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DialogClientesComponent } from '../modals/dialog-clientes/dialog-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit {
 //MODELO QUE USARÉ DESPUÉS
 id_cliente: number
 nombres: string
 direccion: string
 telefono: string
 email: string

 clientes: Clientes[];
 clientesModel: Clientes;
 controllerclientes: boolean = false; 

 displayedColumns: string[] = ['id_cliente', 'nombres', 'direccion', 'telefono','email', 'acciones'];

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog) { }

  ngOnInit(){
    this.listarClientes(); 
  }

  agregarCliente() {
    const nuevoCliente: Clientes = {
      id_cliente: 0,
      nombres: this.nombres,
      direccion: this.direccion,
      telefono: this.telefono,
      email: this.email
    }; 
    this.clientesService.crearCliente(nuevoCliente).subscribe(
      (response) => {
        console.log(response);
        this.listarClientes(); 
        // Aquí se puede manejar la respuesta de la creación del usuario
      },
      (error) => {
        console.log(error);
        // Aquí se puede manejar el error de la creación del usuario
      }
    );
  }
  
  listarClientes() {
    this.controllerclientes = true;
    this.clientesService
      .getClientes()
      .subscribe((cliente) => (this.clientes = cliente));
  }

////////////////EDITAR CLIENTES //////////////////

  editarClientes(cliente: Clientes) {
    return this.clientesService.actualizarCliente(cliente.id_cliente, cliente)
  }

  eliminarCliente(id: number) {
    console.log(id)
    this.clientesService.eliminarCliente(id).subscribe(
      response => {
        console.log(response);
        // Aquí se puede manejar la respuesta de la eliminación del usuario
        
        // Llamada a getUsuarios() dentro del bloque subscribe()
        this.listarClientes(); 
      },
      error => {
        console.log(error);
        
        // Aquí se puede manejar el error de la eliminación del usuario
      }
    );
  }
  
  editarCliente2(cliente: Clientes) {
    const dialogRef = this.dialog.open(DialogClientesComponent, {
      data: { cliente: cliente }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar la tabla después de guardar los cambios
        this.listarClientes();
      }
    });
  }  
}