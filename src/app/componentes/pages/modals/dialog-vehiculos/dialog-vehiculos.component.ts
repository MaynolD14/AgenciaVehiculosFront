import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { Vehiculos } from 'src/app/model/vehiculos';

@Component({
  selector: 'app-dialog-vehiculos',
  templateUrl: './dialog-vehiculos.component.html',
  styleUrls: ['./dialog-vehiculos.component.css']
})
export class DialogVehiculosComponent implements OnInit {
  vehiculo: Vehiculos
  constructor(
    public dialogRef: MatDialogRef<DialogVehiculosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehiculos: VehiculosService
  ) { 
    this.vehiculo = {...data.vehiculo}
  }

  ngOnInit() {
  }

  guardarEdicion(): void {
    this.vehiculos.actualizarVehiculo(this.vehiculo.id_vehiculo, this.vehiculo).subscribe(
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
