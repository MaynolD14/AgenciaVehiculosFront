import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clientes } from 'src/app/model/clientes';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-dialog-delete-clientes',
  templateUrl: './dialog-delete-clientes.component.html',
  styleUrls: ['./dialog-delete-clientes.component.css']
})
export class DialogDeleteClientesComponent implements OnInit {
  cliente: Clientes;
  clienteNombre: string; // Variable para almacenar el nombre del cliente

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientes: ClientesService
  ) {
    this.cliente = { ...data.cliente };
    this.clienteNombre = data.cliente.nombres; // Accede al nombre usando la propiedad Nombres
  }

  ngOnInit() {}

  onConfirm(): void {
    this.dialogRef.close(true); // Usuario confirmó la eliminación
  }

  onCancel(): void {
    this.dialogRef.close(false); // Usuario canceló la eliminación
  }
}
