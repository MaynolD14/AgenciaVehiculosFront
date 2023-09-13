import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedores } from 'src/app/model/proveedores';
import { DialogProveedoresComponent } from '../modals/dialog-proveedores/dialog-proveedores.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent implements OnInit {
  id_proveedor: number; 
    nombres: string;
    telefono: string; 
    email: string;
    empresa: string;

  proveedores: Proveedores[]; // Lista de proveedores
  proveedorsModel: Proveedores; // Modelo de proveedor para edición
  controllerProveedores: boolean = false; // Bandera para control de carga de datos

  displayedColumns: string[] = ['id_proveedor', 'nombres', 'telefono', 'email', 'empresa', 'acciones'];

  constructor(
    private proveedoresService: ProveedoresService, // Servicio para interactuar con proveedores
    private dialog: MatDialog, // Servicio para mostrar diálogos
  ) { }

  ngOnInit() {
    this.listarProveedores(); // Llamada a la función para listar proveedores
  }
  agregarProveedor() {
    const nuevoProveedor: Proveedores = {
      id_proveedor: 0,
      nombres: this.nombres,
      telefono: this.telefono,
      email: this.email,
      empresa: this.empresa
    };
  
    this.proveedoresService.crearProveedor(nuevoProveedor).subscribe(
      (response) => {
        console.log(response);
        this.listarProveedores();
        // Aquí se puede manejar la respuesta de la creación del proveedor
      },
      (error) => {
        console.log(error);
        // Aquí se puede manejar el error de la creación del proveedor
      }
    );
  }
  
  listarProveedores() {
    this.controllerProveedores = true;
    this.proveedoresService
      .getProveedores()
      .subscribe((proveedores) => (this.proveedores = proveedores));
  }
  
  //////////////// EDITAR PROVEEDORES //////////////////
  
  editarProveedor(proveedor: Proveedores) {
    return this.proveedoresService.actualizarProveedor(proveedor.id_proveedor, proveedor);
  }
  
  eliminarProveedor(id: number) {
    console.log(id);
    this.proveedoresService.eliminarProveedor(id).subscribe(
      (response) => {
        console.log(response);
        // Aquí se puede manejar la respuesta de la eliminación del proveedor
        this.listarProveedores();
      },
      (error) => {
        console.log(error);
        // Aquí se puede manejar el error de la eliminación del proveedor
      }
    );
  }
  
  editarProveedor2(proveedor: Proveedores) {
    const dialogRef = this.dialog.open(DialogProveedoresComponent, {
      data: { proveedor: proveedor }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Actualizar la tabla después de guardar los cambios
        this.listarProveedores();
        // Se realizó la edición, realizar las acciones necesarias
        this.editarProveedor(result).subscribe(
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