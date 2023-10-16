import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { PagesComponent } from './pages.component';
import { ReusableModule } from '../reutilizable/reutilizable.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { DialogClientesComponent } from './modals/dialog-clientes/dialog-clientes.component';
import { DialogComprasComponent } from './modals/dialog-compras/dialog-compras.component';
import { DialogProveedoresComponent } from './modals/dialog-proveedores/dialog-proveedores.component';
import { DialogVehiculosComponent } from './modals/dialog-vehiculos/dialog-vehiculos.component';
import { DialogVentasComponent } from './modals/dialog-ventas/dialog-ventas.component';
import { VentasComponent } from './ventas/ventas.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ComprasComponent } from './compras/compras.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatChipsModule} from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { DialogDeleteClientesComponent } from './modals/dialog-delete-clientes/dialog-delete-clientes.component';
import { DialogDeleteProveedoresComponent } from './modals/dialog-delete-proveedores/dialog-delete-proveedores.component';
import { DialogDeleteVehiculosComponent } from './modals/dialog-delete-vehiculos/dialog-delete-vehiculos.component';
import { DialogDeleteComprasComponent } from './modals/dialog-delete-compras/dialog-delete-compras.component';

@NgModule({
    declarations: [
        NavegacionComponent,
        DashboardComponent,
        PagesComponent,
        ClientesComponent,
        VentasComponent,
        VehiculosComponent,
        ComprasComponent,
        ProveedoresComponent,
        DialogClientesComponent,
        DialogComprasComponent,
        DialogProveedoresComponent,
        DialogVehiculosComponent,
        DialogVentasComponent,
        DialogDeleteClientesComponent,
        DialogDeleteProveedoresComponent,
        DialogDeleteVehiculosComponent,
        DialogDeleteComprasComponent
    ],
    imports:[
        CommonModule,
        ReusableModule,
        PagesRoutingModule,
        MatChipsModule,
        FormsModule,
    ],
    providers:[DatePipe]
})
export class PagesModule{}