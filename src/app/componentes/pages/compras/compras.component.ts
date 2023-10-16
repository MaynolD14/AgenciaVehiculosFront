import { Component, OnInit } from '@angular/core';
import { Compras } from 'src/app/model/compras';
import { ComprasService } from 'src/app/services/compras.service';
import { Proveedores } from 'src/app/model/proveedores';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Vehiculos } from 'src/app/model/vehiculos';
import { VehiculosService } from 'src/app/services/vehiculos.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogDeleteClientesComponent } from '../modals/dialog-delete-clientes/dialog-delete-clientes.component';
import { MatTableDataSource } from '@angular/material/table';
import { DialogDeleteComprasComponent } from '../modals/dialog-delete-compras/dialog-delete-compras.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  id_compra: number
  cantidad: number
  descripcion: string
  fechaCompra: string
  precioCompra: number
  id_proveedor: number
  id_vehiculo: number

  compras: Compras[]; 
  compraModel: Compras; 
  controllerCompra: boolean = false;
  controllerCompra2: boolean = false;

  proveedores: Proveedores[];
  proveedorSeleccionado: any; 
  idProveedorSeleccionado: number; 

  vehiculos: Vehiculos[]; 
  vehiculoSeleccionado: any;
  idVehiculoSeleccionado: number;

  DateControl = new FormControl();

  displayedColumns: string[] = ['id_compra', 'cantidad', 'descripcion', 'fechaCompra', 'precioCompra', 'id_proveedor','id_vehiculo', 'acciones'];

  dataSource = new MatTableDataSource<Compras>();

  constructor(
    private comprasService: ComprasService,
    private proveedorService: ProveedoresService,
    private vehiculoService: VehiculosService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar

  ) { }

  //Cambia el formato de la fecha a un formato válido para la BD
  onDateSelection(){
    this.fechaCompra = this.datePipe.transform(this.DateControl.value, 'yyyy-MM-dd'); 
  }

  async ngOnInit() {
    try{
      await this.listarCompras(); 
      await this.getProveedor(); 
      await this.getVehiculos();
      // Inicializa DateControl con la fecha actual
    const today = new Date();
    this.DateControl.setValue(today);
    
    // Llama a la función onDateSelection para formatear la fecha
    this.onDateSelection();
    } catch(e){
      console.log(e);
  }

  }

 //Obtener todos los proveedores
  getProveedor(){
    return new Promise((resolve, reject) =>{
      this.proveedorService.getProveedores().subscribe(
        (proveedor) => {
          this.proveedores = proveedor;
          resolve(proveedor);
        },
        (error) =>{
          reject(error);
        }
      )
    })
  }

 //Mapea el id del proveedor seleccionado y lo asigna al id del modelo
 onChangeProveedor(){
  const proveedor = this.proveedores.find(p => p.id_proveedor === this.proveedorSeleccionado); 
  if(proveedor){
    this.id_proveedor = proveedor.id_proveedor;
  }
 }

 //Obtener todos los vehiculos
 getVehiculos(){
  return new Promise((resolve, reject) =>{
    this.vehiculoService.getVehiculos().subscribe(
      (vehiculos) => {
        this.vehiculos = vehiculos;
        resolve(vehiculos);
      },
      (error) =>{
        reject(error);
      }
    )
  })
 }

 //Mapea el id del vehiculo seleccionado y lo asigna al id del modelo
onChangeVehiculo(){
  const vehiculo = this.vehiculos.find(v => v.id_vehiculo === this.vehiculoSeleccionado);
  if(vehiculo){
    this.id_vehiculo = vehiculo.id_vehiculo;
  }
}

async crearCompras() {
  const nuevaCompra: Compras = {
    id_compra: 0,
    cantidad: this.cantidad,
    descripcion: this.descripcion,
    fechaCompra: this.fechaCompra,
    precioCompra: this.precioCompra,
    id_proveedor: this.id_proveedor,
    id_vehiculo: this.id_vehiculo
  };

  this.comprasService.crearCompras(nuevaCompra).subscribe(
    (response) => {
      console.log(response);

      // Actualiza el stock del vehículo
      this.vehiculoService.actualizarStockVehiculo(this.id_vehiculo, this.cantidad).subscribe(
        (vehiculoResponse) => {
          console.log("Stock del vehículo actualizado:", vehiculoResponse);

          // Después de actualizar el stock, lista las compras
          this.listarCompras();
        },
        (vehiculoError) => {
          console.log("Error al actualizar el stock del vehículo:", vehiculoError);
          this.listarCompras();
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
}



listarCompras(){
  return new Promise((resolve, reject) => {
    this.controllerCompra = true; 
    this.comprasService.getCompras().subscribe(
      (compras) => {
        this.compras = compras;
        resolve(compras);
      },
      (e) => {
        reject(e);
      }
    ); 
  }); 
}

editarCompra(compra: Compras){
  return this.comprasService.actualizarCompras(compra.id_compra, compra);
}

eliminarCompra(compras: Compras) {
console.log(compras);

const dialogRef = this.dialog.open(DialogDeleteComprasComponent, { //sustituir esto por el dialog de compras
  disableClose: true,
  data: { compras: compras}
}); 

dialogRef.afterClosed().subscribe(result => {
  if(result === true) {
    console.log("Usuario confirmó eliminar"); 

    //Lógica de eliminación
    this.comprasService.eliminarCompras(compras.id_compra).subscribe({
      next: (data) => {
        if(data.status) {
          this.mostrarAlerta("No se pudo eliminar la compra", "Error"); 
        } else {
          this.mostrarAlerta("La compra fue eliminada", "Listo!")
          this.listarCompras(); 
        }
      },
      error: (e) => {
        console.log("Fallo al eliminar la compra", e)
      },
      complete: () => {
      }
    }); 
  } else {
    console.log("El usuario canceló la eliminación"); 
  }
}); 
}

mostrarAlerta(mensaje: string, tipo: string){
  this._snackBar.open(mensaje, tipo, {
    horizontalPosition: "end",
    verticalPosition: "top",
    duration: 3000
  }); 
}
}
