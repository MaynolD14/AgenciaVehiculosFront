import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedores } from 'src/app/model/proveedores';

@Component({
  selector: 'app-dialog-proveedores',
  templateUrl: './dialog-proveedores.component.html',
  styleUrls: ['./dialog-proveedores.component.css']
})
export class DialogProveedoresComponent implements OnInit {
  proveedor: Proveedores;

  constructor(
    public dialogRef: MatDialogRef<DialogProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private proveedoresService: ProveedoresService
  ) {
    this.proveedor = { ...data.proveedor };
  }

  ngOnInit() {
  }

  guardarEdicion(): void {
    this.proveedoresService.actualizarProveedor(this.proveedor.id_proveedor, this.proveedor).subscribe(
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

