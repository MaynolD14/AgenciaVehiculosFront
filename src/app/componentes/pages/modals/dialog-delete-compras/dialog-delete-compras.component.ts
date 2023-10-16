import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Compras } from 'src/app/model/compras';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-dialog-delete-compras',
  templateUrl: './dialog-delete-compras.component.html',
  styleUrls: ['./dialog-delete-compras.component.css']
})
export class DialogDeleteComprasComponent implements OnInit {

  compra: Compras;
  idCompra: number; // Variable para almacenar el nombre del cliente

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComprasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compras: ComprasService
  ) {
    this.compra = { ...data.compras };
    this.idCompra = data.compras.id_compra; // Accede al nombre usando la propiedad Nombres
  }

  ngOnInit() {}

  onConfirm(): void {
    this.dialogRef.close(true); // Usuario confirmó la eliminación
  }

  onCancel(): void {
    this.dialogRef.close(false); // Usuario canceló la eliminación
  }
}
