import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Vehiculos } from 'src/app/model/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { DialogVehiculosComponent } from '../modals/dialog-vehiculos/dialog-vehiculos.component';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent implements OnInit {

 //MODELO QUE USARÉ DESPUÉS
    id_vehiculo: number; 
    marca: string;
    modelo: string;
    anio: string;
    stock: number;
    precio_uni: number;

    vehiculos: Vehiculos[];
    vehiculoModel: Vehiculos; //
    controllerVehiculo: boolean = false; 

 displayedColumns: string[] = ['id_vehiculo', 'marca', 'modelo', 'anio', 'stock', 'precio_uni', 'acciones'];

  constructor(
    private vehiculoService: VehiculosService,
    private dialog: MatDialog) { }

  ngOnInit(){
    this.listarVehiculos(); 
  }

  agregarVehiculos() {
    const nuevoVehiculo: Vehiculos = {
      id_vehiculo: 0,
      marca: this.marca,
      modelo: this.modelo,
      anio: this.anio,
      stock: this.stock,
      precio_uni: this.precio_uni
    }; 
    this.vehiculoService.crearVehiculo(nuevoVehiculo).subscribe(
      (response) => {
        console.log(response);
        this.listarVehiculos(); 
        // Aquí se puede manejar la respuesta de la creación del usuario
      },
      (error) => {
        console.log(error);
        // Aquí se puede manejar el error de la creación del usuario
      }
    );
  }
  
  listarVehiculos() {
    this.controllerVehiculo = true;
    this.vehiculoService
      .getVehiculos()
      .subscribe((vehiculo) => (this.vehiculos = vehiculo));
      
  }

////////////////EDITAR CLIENTES //////////////////

  editarVehiculo(vehiculo: Vehiculos) {
    return this.vehiculoService.actualizarVehiculo(vehiculo.id_vehiculo, vehiculo)
  }

  eliminarVehiculo(id: number) {
    console.log(id)
    this.vehiculoService.eliminarVehiculo(id).subscribe(
      response => {
        console.log(response);
        // Aquí se puede manejar la respuesta de la eliminación del usuario
        
        // Llamada a getUsuarios() dentro del bloque subscribe()
        this.listarVehiculos(); 
      },
      error => {
        console.log(error);
        
        // Aquí se puede manejar el error de la eliminación del usuario
      }
    );
  }
  
  editarCliente2(vehiculo: VehiculosService) {
    console.log(vehiculo);
    const dialogRef = this.dialog.open(DialogVehiculosComponent, {
      data: { vehiculo: vehiculo }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
       // Actualizar la tabla después de guardar los cambios
        this.listarVehiculos();
        // Se realizó la edición, realizar las acciones necesarias
        this.editarVehiculo(result).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }
}
