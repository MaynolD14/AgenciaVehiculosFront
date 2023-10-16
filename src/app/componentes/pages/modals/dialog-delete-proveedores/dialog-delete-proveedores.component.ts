import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Proveedores } from 'src/app/model/proveedores';
import { ProveedoresService } from 'src/app/services/proveedores.service';


@Component({
  selector: 'app-dialog-delete-proveedores',
  templateUrl: './dialog-delete-proveedores.component.html',
  styleUrls: ['./dialog-delete-proveedores.component.css']
})
export class DialogDeleteProveedoresComponent implements OnInit {
  proveedor: Proveedores;
  proveedorNombre: string; // Variable para almacenar el nombre del cliente

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proveedores: ProveedoresService
  ) {
    this.proveedor = { ...data.proveedor };
    this.proveedorNombre = data.proveedor.nombres; // Accede al nombre usando la propiedad Nombres
  }

  ngOnInit() {}

  onConfirm(): void {
    this.dialogRef.close(true); // Usuario confirmó la eliminación
  }

  onCancel(): void {
    this.dialogRef.close(false); // Usuario canceló la eliminación
  }
}
