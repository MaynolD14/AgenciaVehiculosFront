import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-dialog-clientes',
  templateUrl: './dialog-clientes.component.html',
  styleUrls: ['./dialog-clientes.component.css']
})
export class DialogClientesComponent implements OnInit {
  clienteData: any = {};
  showMessage = false; // Agregar una propiedad para controlar la visualización del mensaje
  clienteId: number; // Agregar una propiedad para almacenar el ID del cliente
  isLoading = false; // Agregar una propiedad para controlar la carga

  constructor(
    public dialogRef: MatDialogRef<DialogClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientes: ClientesService
  ) {
      // Obtener el ID del cliente de los datos proporcionados
    this.clienteId = data.cliente.id_cliente;
   }

  ngOnInit() {
     // Cargar la data del cliente cuando se abre el diálogo
     this.loadClienteData();
  }

  loadClienteData() {
    this.isLoading = true; // Mostrar indicador de carga
    this.showMessage = false; // Ocultar el mensaje al cargar los datos
    this.clientes.getClienteID(this.clienteId).subscribe(
      (cliente: any) => {
        this.clienteData.nombres = cliente.Nombres;
        this.clienteData.email = cliente.Email;
        this.clienteData.direccion = cliente.Direccion;
        this.clienteData.telefono = cliente.Telefono;
        this.isLoading = false; // Ocultar indicador de carga cuando se completa
      },
      (error) => {
        console.log(error);
        this.isLoading = false; // También debes ocultar el indicador en caso de error
      }
    );
  }

  guardarEdicion(): void {
    // Comprobar si los datos han cambiado
    if (this.sonDatosDiferentes()) {
      this.clientes.actualizarCliente(this.clienteId, this.clienteData).subscribe(
        (response) => {
          console.log(response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // Mostrar el mensaje solo cuando los datos son iguales y se hace clic en guardar
      this.showMessage = true;
    }
  }

  // Función para comparar los datos actuales con los originales
  sonDatosDiferentes(): boolean {
    // Compara los campos relevantes para determinar si los datos han cambiado
    return (
      this.clienteData.nombres !== this.data.cliente.Nombres ||
      this.clienteData.email !== this.data.cliente.Email ||
      this.clienteData.direccion !== this.data.cliente.Direccion ||
      this.clienteData.telefono !== this.data.cliente.Telefono
    );
  }


  cancelarEdicion(): void {
    this.dialogRef.close(false);
  }
}
