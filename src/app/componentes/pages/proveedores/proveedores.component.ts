import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Proveedores } from 'src/app/model/proveedores';
import { DialogProveedoresComponent } from '../modals/dialog-proveedores/dialog-proveedores.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteProveedoresComponent } from '../modals/dialog-delete-proveedores/dialog-delete-proveedores.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private dialog: MatDialog,
    private _snackBar: MatSnackBar, // Servicio para mostrar diálogos
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

////////////////ELIMINAR PROVEEDORES //////////////////

  
eliminarProveedores(proveedor: Proveedores) {
  console.log(proveedor);

  const dialogRef = this.dialog.open(DialogDeleteProveedoresComponent, {
    disableClose: true,
    data: { proveedor: proveedor }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      console.log("Usuario confirmó eliminar");
      console.log(proveedor.id_proveedor);
      // Lógica de eliminación aquí
      this.proveedoresService.eliminarProveedor(proveedor.id_proveedor).subscribe(
        () => {
          this.mostrarAlerta("El proveedor fue eliminado", "Listo!");
          this.listarProveedores();
        },
        (error) => {
          console.log("Fallo al eliminar el proveedor:", error);
          this.mostrarAlerta("No se pudo eliminar el proveedor", "Error");
        }
      );
    } else {
      console.log("Usuario canceló la eliminación");
    }
  });
}


mostrarAlerta(mensaje:string,tipo:string) {
  this._snackBar.open(mensaje, tipo, {
    horizontalPosition: "end",
    verticalPosition: "top",
    duration:3000
  });
}

}  