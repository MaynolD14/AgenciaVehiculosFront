import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Clientes } from 'src/app/model/clientes';
import { MatDialog } from '@angular/material/dialog';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DialogClientesComponent } from '../modals/dialog-clientes/dialog-clientes.component';
import { DialogDeleteClientesComponent } from '../modals/dialog-delete-clientes/dialog-delete-clientes.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    ) { }

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
        // Aquí se puede manejar la respuesta de la creación del cliente
      },
      (error) => {
        console.log(error);
        // Aquí se puede manejar el error de la creación del cliente
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


////////////////ELIMINAR CLIENTES //////////////////

  
eliminarClientes(clientes: Clientes) {
  console.log(clientes);

  const dialogRef = this.dialog.open(DialogDeleteClientesComponent, {
    disableClose: true,
    data: { cliente: clientes }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      console.log("Usuario confirmó eliminar");
      
      // Lógica de eliminación aquí
      this.clientesService.eliminarCliente(clientes.id_cliente).subscribe({
        next: (data) => {
          if (data.status) {
            this.mostrarAlerta("No se pudo eliminar el Cliente", "Error");
          } else {
            this.mostrarAlerta("El Cliente fue eliminado", "Listo!")
            this.listarClientes();
          }
        },
        error: (e) => {
          console.log("Fallo al eliminar el cliente:", e);
        },
        complete: () => {
        }
      });
      
    } else {
      console.log("Usuario canceló la eliminación");
    }
  });
}

mostrarAlerta(mensaje:string,tipo:string) {
  this._snackBar.open(mensaje, tipo, {
    horizontalPosition: "end",
    verticalPosition: "top",
    duration:3000
  });
}
}