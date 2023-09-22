import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientesService } from 'src/app/services/clientes.service';
import { Clientes } from 'src/app/model/clientes';
@Component({
  selector: 'app-dialog-clientes',
  templateUrl: './dialog-clientes.component.html',
  styleUrls: ['./dialog-clientes.component.css']
})
export class DialogClientesComponent implements OnInit {
    cliente: Clientes
    constructor(
      public dialogRef: MatDialogRef<DialogClientesComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private clientesService: ClientesService
    ) {
      this.cliente = { ...data.cliente };
    }

  ngOnInit() {
  }

  guardarEdicion(): void {
    this.clientesService.actualizarCliente(this.cliente.id_cliente, this.cliente).subscribe(
      (response) => {
        console.log(response);
        this.dialogRef.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancelarEdicion(): void {
    this.dialogRef.close(false);
  }

}
