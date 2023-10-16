import { Component, OnInit, Inject } from '@angular/core';
import { Vehiculos } from 'src/app/model/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-vehiculos',
  templateUrl: './dialog-delete-vehiculos.component.html',
  styleUrls: ['./dialog-delete-vehiculos.component.css']
})
export class DialogDeleteVehiculosComponent implements OnInit {

  vehiculo: Vehiculos
  vehiculoMarca: string; 
  vehiculoModelo: string;
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteVehiculosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehiculos: VehiculosService
  ) {
    this.vehiculo = { ...data.vehiculo };
    this.vehiculoMarca = data.vehiculo.marca // Accede al nombre usando la propiedad marca
    this.vehiculoModelo = data.vehiculo.modelo
  }

  ngOnInit() {}

  onConfirm(): void {
    this.dialogRef.close(true); // Usuario confirmó la eliminación
  }

  onCancel(): void {
    this.dialogRef.close(false); // Usuario canceló la eliminación
  }

}
